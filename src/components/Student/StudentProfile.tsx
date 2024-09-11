import { useAuth } from "@hooks/useAuth";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { LoadingPage } from "@pages/LoadingPage";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { findStudentByEmail, updateStudent } from "services/studentService";
import { Student } from "types/student";
import { enqueueNotification } from "utils/enqueueNotification";

const sexTypes = [
  { key: "BLANK", label: "Prefiro não Informar" },
  { key: "MAN", label: "Masculino" },
  { key: "WOMAN", label: "Feminino" },
];

type Inputs = {
  sex: string;
  name: string;
  age: number;
  matriculation: string;
};

export function StudentProfile() {
  const { user } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (student) {
      const newStudent: Student = {
        ...student,
        name: data.name,
        age: data.age,
        sex: data.sex,
      };

      updateStudent(newStudent)
        .then(() => {
          enqueueNotification(
            "Informações atualizadas com sucesso!",
            "success"
          );
        })
        .catch((error) => {
          enqueueNotification(error.response.data, "error");
        });
    }
  };

  useEffect(() => {
    if (user) {
      findStudentByEmail(user.email)
        .then((response) => {
          const { name, age, sex, matriculation } = response.data;
          setStudent(response.data);

          setValue("name", name);
          setValue("age", age);
          setValue("sex", sex);
          setValue("matriculation", matriculation);
        })
        .catch((error) => {
          enqueueNotification(error.response.data, "error");
        });
    }
  }, [user, setValue]);

  if (!student) return <LoadingPage />;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name", { required: "Nome obrigatório" })}
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        color="primary"
        label="Nome"
      />

      <Select
        {...register("sex")}
        color="primary"
        items={sexTypes}
        label="Sexo"
        placeholder="Selecione o sexo"
      >
        {(sex) => <SelectItem key={sex.key}>{sex.label}</SelectItem>}
      </Select>

      <Input
        {...register("age", {
          required: "Idade obrigatória",
          valueAsNumber: true,
        })}
        errorMessage={errors.age?.message}
        isInvalid={!!errors.age}
        color="primary"
        label="Idade"
      />

      <Input
        {...register("matriculation")}
        label="Matricula"
        color="warning"
        disabled
      />
      <Button color="primary" type="submit">
        Atualizar Informações
      </Button>
    </form>
  );
}
