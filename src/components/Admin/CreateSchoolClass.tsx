import { useAuth } from "@hooks/useAuth";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { saveSchoolClass } from "services/schoolClassService";
import { School } from "types/school";
import { SchoolClass } from "types/schoolClass";
import { enqueueNotification } from "utils/enqueueNotification";

type Inputs = {
  code: string;
};

export function CreateSchoolClass() {
  const { userSchool } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const schoolClass: SchoolClass = {
      code: data.code,
      students: [],
      disciplines: [],
      school: userSchool ? userSchool : (null as unknown as School),
    };

    if (!userSchool || userSchool.name === "Todas as Escolas")
      return enqueueNotification(
        "Para criar uma disciplina, escolha uma escola a ser gerenciada!",
        "error"
      );

    saveSchoolClass(schoolClass)
      .then(() => {
        reset();
        enqueueNotification("Turma criada com sucesso!", "success");
      })
      .catch((error) => {
        enqueueNotification(error.response.data.message, "error");
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">Criar uma Nova Turma</h1>
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register("code", {
              required: "Código obrigatório",
              minLength: {
                value: 3,
                message: "Código deve ter no mínimo 3 caracteres",
              },
            })}
            onKeyUp={() => trigger("code")}
            errorMessage={errors.code?.message}
            isInvalid={!!errors.code}
            label="Código da Turma"
            type="text"
            placeholder="Insira o código da Turma"
            isRequired
          />

          <Button type="submit" color="primary" className="w-full rounded-md">
            Criar
          </Button>
        </form>
      </div>
    </div>
  );
}
