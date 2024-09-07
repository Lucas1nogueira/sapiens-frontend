import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { updateEvaluation } from "services/evaluationService";
import { Discipline } from "types/discipline";
import { Evaluation } from "types/evaluation";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  evaluation: Evaluation;
  discipline: Discipline;
};

export function EditEvaluation({ discipline, evaluation }: Props) {
  const [name, setName] = useState(evaluation.name);
  const [deliveryDate, setDeliveryDate] = useState(evaluation.deliveryAt);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editedLesson: Evaluation = {
      ...evaluation,
      name,
      deliveryAt: deliveryDate,
      discipline,
    };

    updateEvaluation(editedLesson)
      .then(() => {
        setName("");
        setDeliveryDate("");

        enqueueNotification("Atividade atualizada com sucesso!", "success");
      })
      .catch((error) => enqueueNotification(error.response.data, "error"));
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
            Atualizar
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
