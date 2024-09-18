import { useAuth } from "@hooks/useAuth";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { LoadingPage } from "@pages/LoadingPage";
import { useMutation } from "@tanstack/react-query";
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

  const mutationUpdate = useMutation({
    mutationFn: (updatedTeacher: Teacher) => updateTeacher(updatedTeacher),
    onSuccess: () => {
      enqueueNotification("Informações atualizadas com sucesso!", "success");
    },
    onError: () => {
      enqueueNotification("Erro ao atualizar informações.", "error");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (teacher) {
      const newTeacher: Teacher = {
        ...teacher,
        name: data.name,
        age: data.age,
        sex: data.sex,
      };

      mutationUpdate.mutate(newTeacher);
    }
  };

  useEffect(() => {
    if (user) {
      findTeacherByEmail(user.email)
        .then((response) => {
          setTeacher(response);

          const { name, age, sex, code } = response;
          setValue("name", name);
          setValue("age", age);
          setValue("sex", sex);
          setValue("code", code);
        })
        .catch((error) => {
          console.log(error);
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
