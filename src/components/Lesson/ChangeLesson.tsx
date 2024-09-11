import { Button, Input, Textarea } from "@nextui-org/react";
import { Lesson } from "types/lesson";
import { saveLesson, updateLesson } from "services/lessonService";
import { Discipline } from "types/discipline";
import { formatDateForInput } from "utils/formatDate";
import { enqueueNotification } from "utils/enqueueNotification";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  lesson?: Lesson;
  discipline: Discipline;
};

type Inputs = {
  description: string;
  date: string;
  manyLessons: number;
};

export function ChangeLesson({ lesson, discipline }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      description: lesson?.description || "",
      date: lesson ? formatDateForInput(lesson?.date) : "",
      manyLessons: lesson?.manyLessons || 1,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const dateTime = new Date(data.date);
    const adjustedDate = new Date(
      dateTime.getTime() + dateTime.getTimezoneOffset() * 60000
    );

    if (lesson) {
      const editedLesson: Lesson = {
        ...lesson,
        discipline,
        description: data.description,
        date: adjustedDate.toISOString(),
        manyLessons: data.manyLessons,
      };

      updateLesson(editedLesson)
        .then(() => {
          reset();
          enqueueNotification("Aula atualizada com sucesso!", "success");
        })
        .catch((error) => enqueueNotification(error.response.data, "error"));

      return;
    }

    const newLesson: Lesson = {
      id: null as unknown as string,
      description: data.description,
      date: adjustedDate.toISOString(),
      manyLessons: data.manyLessons,
      discipline,
      attendances: [],
    };

    saveLesson(newLesson)
      .then(() => {
        reset();

        enqueueNotification("Aula criada com sucesso!", "success");
      })
      .catch((error) => enqueueNotification(error.response.data, "error"));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {lesson ? "Editar" : "Criar"} Aula
        </h1>
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Textarea
            {...register("description", {
              required: "Preencha a descrição da aula",
            })}
            isInvalid={!!errors.description}
            errorMessage={errors.description?.message}
            label="Descricão"
            id="description"
            placeholder="Descrição da Aula"
            isRequired
          />

          <Input
            {...register("date", {
              required: "Preencha a data da aula",
            })}
            isInvalid={!!errors.date}
            errorMessage={errors.date?.message}
            label="Data"
            id="date"
            type="date"
            isRequired
          />

          <Input
            {...register("manyLessons", {
              required: "Preencha a quantidade de aulas",
              valueAsNumber: true,
            })}
            isInvalid={!!errors.manyLessons}
            errorMessage={errors.manyLessons?.message}
            label="Quantidade de Aulas"
            id="manyLessons"
            type="number"
            min={1}
            step={1}
            isRequired
          />

          <Button type="submit" color="primary">
            Salvar Alterações
          </Button>
        </form>
      </div>
    </div>
  );
}
