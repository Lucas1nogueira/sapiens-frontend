import { Button, Input, Textarea } from "@nextui-org/react";
import { Discipline } from "types/discipline";
import { Lesson } from "types/lesson";
import { useState } from "react";
import { saveLesson } from "services/lessonService";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";

type Props = {
  discipline: Discipline;
};

export function CreateLesson({ discipline }: Props) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [manyLessons, setManyLessons] = useState(0);
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const lesson: Lesson = {
      id: null as unknown as string,
      description,
      date,
      manyLessons,
      discipline,
      attendances: [],
    };

    saveLesson(lesson)
      .then(() => {
        setDescription("");
        setDate("");
        setManyLessons(0);

        setSuccess("Aula criada com sucesso!");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Adicionar Aula</h1>
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
            min={0}
            step={1}
            value={manyLessons.toString()}
            onValueChange={(value) => setManyLessons(Number(value))}
            isRequired
            required
          />

          <Button type="submit" color="primary">
            Adicionar Aula
          </Button>
        </form>
      </div>
    </div>
  );
}
