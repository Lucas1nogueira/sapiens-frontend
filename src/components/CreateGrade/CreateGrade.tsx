import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { Discipline } from "types/discipline";
import { Student } from "types/student";

type Props = {
  discipline: Discipline;
  students: Student[];
};

export function CreateGrade({ discipline, students }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Card shadow="none">
      <CardHeader>
        <h1 className="text-xl">
          Lançar notas para a atividade: {discipline.name}
        </h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          {students.map((student) => (
            <div className="flex justify-between" key={student.id}>
              <Input
                label="Nota"
                type="number"
                placeholder="Insira a nota da atividade"
                value={name}
                onValueChange={setName}
                isRequired
              />
              <p>{student.name}</p>
            </div>
          ))}

          <Button color="primary" type="submit">
            Lançar
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
