import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { updateDiscipline } from "services/disciplineService";
import { Discipline } from "types/discipline";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  discipline: Discipline;
};

export function EditDiscipline({ discipline }: Props) {
  const [code, setCode] = useState(discipline.code);
  const [name, setName] = useState(discipline.name);
  const [manyLessons, setManyLessons] = useState(discipline.manyLessons);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editedDiscipline: Discipline = {
      ...discipline,
      code,
      name,
      manyLessons,
      manyHours: manyLessons * 50,
    };

    updateDiscipline(editedDiscipline)
      .then(() => {
        setCode("");
        setName("");
        setManyLessons(0);

        enqueueNotification("Disciplina atualizada com sucesso!", "success");
      })
      .catch((error) =>
        enqueueNotification(error.response.data.message, "error")
      );
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">Editar Disciplina</h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <Input
            label="Código da Disciplina"
            type="text"
            value={code}
            onValueChange={setCode}
            placeholder="Insira o código da disciplina"
            errorMessage="Insira um código válido"
            isRequired
          />
          <Input
            label="Quantidade de Aulas"
            type="number"
            value={manyLessons?.toString() || ""}
            onValueChange={(value) => setManyLessons(Number(value))}
            placeholder="Insira a quantidade de aulas"
            errorMessage="Insira uma quantidade de aulas válida"
            isRequired
          />
          <Input
            label="Nome"
            type="text"
            value={name}
            onValueChange={setName}
            placeholder="Insira seu nome"
            errorMessage="Insira um nome válido"
            isRequired
          />
          <Button type="submit" color="primary" className="w-full rounded-md">
            Atualizar
          </Button>
        </form>
      </div>
    </div>
  );
}
