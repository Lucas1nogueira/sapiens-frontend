import { useAuth } from "@hooks/useAuth";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { saveDiscipline, updateDiscipline } from "services/disciplineService";
import { Discipline } from "types/discipline";
import { School } from "types/school";
import { SchoolClass } from "types/schoolClass";
import { Teacher } from "types/teacher";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  discipline?: Discipline;
};

type Inputs = {
  code: string;
  name: string;
  manyLessons: number;
};

const LESSONS_HOURS = 50;

export function ChangeDiscipline({ discipline }: Props) {
  const { userSchool } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      code: discipline?.code || "",
      name: discipline?.name || "",
      manyLessons: discipline?.manyLessons || 1,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (discipline) {
      const editedDiscipline: Discipline = {
        ...discipline,
        code: data.code,
        name: data.name,
        manyLessons: data.manyLessons,
      };

      updateDiscipline(discipline.code, editedDiscipline)
        .then(() => {
          reset();

          enqueueNotification("Disciplina editada com sucesso!", "success");
        })
        .catch((error) => {
          enqueueNotification(error.response.data, "error");
        });

      return;
    }

    if (!userSchool || userSchool.name === "Todas as Escolas")
      return enqueueNotification(
        "Para criar uma disciplina, escolha uma escola a ser gerenciada!",
        "error"
      );

    const newDiscipline: Discipline = {
      code: data.code,
      name: data.name,
      manyLessons: data.manyLessons,
      manyHours: data.manyLessons * LESSONS_HOURS,
      teacher: null as unknown as Teacher,
      schoolClass: null as unknown as SchoolClass,
      evaluations: [],
      schedule: [],
      lessons: [],
      school: userSchool ? userSchool : (null as unknown as School),
    };

    saveDiscipline(newDiscipline)
      .then(() => {
        reset();

        enqueueNotification("Disciplina criada com sucesso!", "success");
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          {discipline ? "Editar Disciplina" : "Criar Disciplina"}
        </h1>
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register("code", {
              required: "Código obrigatório",
              minLength: {
                value: 3,
                message: "Código inválido",
              },
            })}
            errorMessage={errors.code?.message}
            isInvalid={!!errors.code}
            label="Código da Disciplina"
            type="text"
            placeholder="Insira o código da disciplina"
            isRequired
          />
          <Input
            {...register("manyLessons", {
              required: "Quantidade de Aulas obrigatória",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Quantidade de Aulas inválida",
              },
            })}
            errorMessage={errors.manyLessons?.message}
            isInvalid={!!errors.manyLessons}
            label="Quantidade de Aulas"
            type="number"
            placeholder="Insira a quantidade de aulas"
            isRequired
          />
          <Input
            {...register("name", { required: "Nome obrigatório" })}
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
            label="Nome"
            type="text"
            placeholder="Insira seu nome"
            isRequired
          />

          <Button type="submit" color="primary" className="w-full rounded-md">
            Salvar Alterações
          </Button>
        </form>
      </div>
    </div>
  );
}
