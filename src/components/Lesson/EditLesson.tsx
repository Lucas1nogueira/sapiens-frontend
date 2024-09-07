import { Button, Input, Textarea } from "@nextui-org/react";
import { Lesson } from "types/lesson";
import { useState } from "react";
import { updateLesson } from "services/lessonService";
import { Discipline } from "types/discipline";
import { formatDateForInput } from "utils/formatDate";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  lesson: Lesson;
  discipline: Discipline;
};

export function EditLesson({ lesson, discipline }: Props) {
  const [description, setDescription] = useState(lesson.description);
  const [date, setDate] = useState(formatDateForInput(lesson.date));
  const [manyLessons, setManyLessons] = useState(lesson.manyLessons);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const dateTime = new Date(date);
    const adjustedDate = new Date(
      dateTime.getTime() + dateTime.getTimezoneOffset() * 60000
    );

    const editedLesson: Lesson = {
      ...lesson,
      discipline,
      description,
      date: adjustedDate.toISOString(),
      manyLessons,
    };

    updateLesson(editedLesson)
      .then(() => {
        setDescription("");
        setDate("");
        setManyLessons(1);

        enqueueNotification("Aula atualizada com sucesso!", "success");
      })
      .catch((error) => enqueueNotification(error.response.data, "error"));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Atualizar Aula</h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <Textarea
            label="Descricão"
            id="description"
            placeholder="Descrição da Aula"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isRequired
            required
          />

          <Input
            label="Data"
            id="date"
            type="date"
            value={date}
            onValueChange={setDate}
            isRequired
            required
          />

          <Input
            label="Quantidade de Aulas"
            id="manyLessons"
            type="number"
            min={1}
            step={1}
            value={manyLessons.toString()}
            onValueChange={(value) => setManyLessons(Number(value))}
            isRequired
            required
          />

          <Button type="submit" color="primary">
            Atualizar
          </Button>
        </form>
      </div>
    </div>
  );
}
