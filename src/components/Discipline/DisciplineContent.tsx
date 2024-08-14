import { useError } from "@hooks/useError";
import { Icon } from "@iconify/react";
import {
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

type Props = {
  discipline: Discipline;
  setDiscipline: (discipline: Discipline | null) => void;
};

export function DisciplineContent({ discipline, setDiscipline }: Props) {
  const { setError } = useError();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  useEffect(() => {
    api
      .get<Evaluation[]>(`evaluation/discipline/${discipline.code}`)
      .then((response) => setEvaluations(response.data))
      .catch((error) => setError(error.response.data));
  }, [discipline.code, setError]);

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
            {evaluations.map((evaluation) => (
              <div key={evaluation.id} className="flex flex-col gap-2">
                <p>{evaluation.name}</p>
                <Divider />
              </div>
            ))}
          </Tab>
          <Tab key="grades" title="Notas">
            <p>Notas</p>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
