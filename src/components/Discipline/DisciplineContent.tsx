import { useAuth } from "@hooks/useAuth";
import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";
import { Evaluation } from "types/evaluation";
import { Grade } from "types/grade";
import { formatDate, formatDateWithHour } from "utils/formatDate";

type Props = {
  discipline: Discipline;
  setDiscipline: (discipline: Discipline | null) => void;
};

export function DisciplineContent({ discipline, setDiscipline }: Props) {
  const { user } = useAuth();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {
    api
      .get<Evaluation[]>(`evaluation/discipline/${discipline.code}`)
      .then((response) => setEvaluations(response.data))
      .catch((error) => console.log(error.response.data));
  }, [discipline.code]);

  useEffect(() => {
    api
      .get<Grade[]>(`grade/student/${user?.id}`)
      .then((response) => setGrades(response.data))
      .catch((error) => console.log(error.response.data));
  }, [user?.id]);

  const getGradeByEvaluation = (evaluation: Evaluation) => {
    return grades.find((grade) => grade.evaluation.id === evaluation.id);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <Button color="primary" isIconOnly onClick={() => setDiscipline(null)}>
          <Icon icon="ion:chevron-back" />
        </Button>
        <div className="flex gap-2 items-center">
          <div>
            <p className="text-tiny uppercase font-bold">{discipline.name}</p>
            <p className="text-xs">{discipline.teacher.name}</p>
          </div>
          <Avatar
            isBordered
            radius="sm"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        </div>
      </CardHeader>
      <CardBody>
        <Divider />
        <Tabs
          aria-label="Options"
          color="primary"
          className="max-w-5xl w-full overflow-x-auto"
          classNames={{
            tabList: "overflow-x-visible",
          }}
          variant="underlined"
        >
          <Tab key="evaluations" title="Atividades">
            <Accordion variant="splitted">
              {evaluations.map((evaluation) => (
                <AccordionItem key={evaluation.id} title={evaluation.name}>
                  <div className="flex justify-between text-sm">
                    <div className="flex flex-col gap-2">
                      <p>
                        Data da criação:{" "}
                        {formatDate(evaluation.createdAt) ?? "Sem Data"}
                      </p>
                      {getGradeByEvaluation(evaluation) ? (
                        <p>Nota: {getGradeByEvaluation(evaluation)?.value}</p>
                      ) : (
                        <></>
                      )}
                    </div>
                    <p>
                      Data da entrega:{" "}
                      {formatDateWithHour(evaluation.deliveryAt) ?? "Sem Data"}
                    </p>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
