import { useAuth } from "@hooks/useAuth";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { LoadingPage } from "@pages/LoadingPage";
import { useMutation } from "@tanstack/react-query";
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

  const mutationUpdate = useMutation({
    mutationFn: (updatedStudent: Student) => updateStudent(updatedStudent),
    onSuccess: () => {
      enqueueNotification("Informações atualizadas com sucesso!", "success");
    },
    onError: () => {
      enqueueNotification("Erro ao atualizar informações.", "error");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (student) {
      const newStudent: Student = {
        ...student,
        name: data.name,
        age: data.age,
        sex: data.sex,
      };

      mutationUpdate.mutate(newStudent);
    }
  };

  useEffect(() => {
    if (user) {
      findStudentByEmail(user.email)
        .then((response) => {
          const { name, age, sex, matriculation } = response;
          setStudent(response);

          setValue("name", name);
          setValue("age", age);
          setValue("sex", sex);
          setValue("matriculation", matriculation);
        })
        .catch((error) => {
          console.log(error.response.data);
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
      <Button
        color="primary"
        type="submit"
        isLoading={mutationUpdate.isPending}
      >
        Atualizar Informações
      </Button>
    </form>
  );
}
