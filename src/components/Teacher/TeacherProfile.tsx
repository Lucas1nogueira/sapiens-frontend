import { useAuth } from "@hooks/useAuth";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { LoadingPage } from "@pages/LoadingPage";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { findTeacherByEmail, updateTeacher } from "services/teacherService";
import { Teacher } from "types/teacher";
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
  code: string;
};

export function TeacherProfile() {
  const { user } = useAuth();
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (teacher) {
      const newTeacher: Teacher = {
        ...teacher,
        name: data.name,
        age: data.age,
        sex: data.sex,
      };

      updateTeacher(newTeacher)
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
      findTeacherByEmail(user.email)
        .then((response) => {
          setTeacher(response.data);

          const { name, age, sex, code } = response.data;
          setValue("name", name);
          setValue("age", age);
          setValue("sex", sex);
          setValue("code", code);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [user, setValue]);

  if (!teacher) return <LoadingPage />;

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

      <Input {...register("code")} label="Código" color="warning" disabled />

      <Button color="primary" type="submit">
        Atualizar Informações
      </Button>
    </form>
  );
}
