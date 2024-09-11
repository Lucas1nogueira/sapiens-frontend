import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { saveEvaluation, updateEvaluation } from "services/evaluationService";
import { Discipline } from "types/discipline";
import { Evaluation } from "types/evaluation";
import { Student } from "types/student";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  evaluation?: Evaluation;
  discipline: Discipline;
};

type Inputs = {
  name: string;
  deliveryDate: string;
};

export function ChangeEvaluation({ discipline, evaluation }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name: evaluation?.name || "",
      deliveryDate: evaluation?.deliveryAt || "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (evaluation) {
      const editedEvaluation: Evaluation = {
        ...evaluation,
        name: data.name,
        deliveryAt: data.deliveryDate,
        discipline,
      };

      updateEvaluation(editedEvaluation)
        .then(() => {
          reset();
          enqueueNotification("Avaliação atualizada com sucesso!", "success");
        })
        .catch((error) => {
          enqueueNotification(error.response.data, "error");
        });

      return;
    }

    const newEvaluation: Evaluation = {
      id: null as unknown as string,
      name: data.name,
      createdAt: new Date().toISOString(),
      deliveryAt: data.deliveryDate,
      student: null as unknown as Student,
      discipline,
      grades: [],
    };

    saveEvaluation(newEvaluation)
      .then(() => {
        reset();
        enqueueNotification("Avaliação criada com sucesso!", "success");
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
      });
  };

  return (
    <Card shadow="none">
      <CardHeader className="flex justify-center">
        <h1 className="text-2xl font-bold">
          {evaluation ? "Editar" : "Adicionar"} Avaliação
        </h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            {...register("name", { required: "Nome obrigatório" })}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            label="Nome"
            type="text"
            placeholder="Insira o nome da atividade"
            isRequired
          />

          <Input
            {...register("deliveryDate", {
              required: "Data de Entrega obrigatória",
            })}
            isInvalid={!!errors.deliveryDate}
            errorMessage={errors.deliveryDate?.message}
            label="Data de Entrega"
            placeholder="Insira a data de entrega da atividade"
            type="datetime-local"
            isRequired
          />

          <Button color="primary" type="submit">
            Salvar Alterações
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
