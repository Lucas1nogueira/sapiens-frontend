import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";
import { Evaluation } from "types/evaluation";
import { Student } from "types/student";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  discipline: Discipline;
};

export function CreateEvaluation({ discipline }: Props) {
  const [name, setName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const evaluation: Evaluation = {
      id: null as unknown as string,
      name,
      createdAt: new Date().toISOString(),
      deliveryAt: deliveryDate,
      student: null as unknown as Student,
      discipline,
      grades: [],
    };

    api
      .post("evaluation/save", evaluation)
      .then(() => {
        setName("");
        setDeliveryDate("");

        enqueueNotification("Atividade criada com sucesso!", "success");
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
      });
  };

  return (
    <Card shadow="none">
      <CardHeader className="flex justify-center">
        <h1 className="text-2xl font-bold">Nova Avaliação</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nome"
            type="text"
            placeholder="Insira o nome da atividade"
            value={name}
            onValueChange={setName}
            isRequired
          />

          <Input
            label="Data de Entrega"
            placeholder="Insira a data de entrega da atividade"
            type="datetime-local"
            value={deliveryDate}
            onChange={(event) => setDeliveryDate(event.target.value)}
            isRequired
          />

          <Button color="primary" type="submit">
            Lançar
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
