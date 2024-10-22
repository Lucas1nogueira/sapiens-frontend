import { Loading } from "@components/Common/Loading";
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
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { findEvaluationsByDisciplineCode } from "services/evaluationService";
import { findGradesByStudentId } from "services/gradeService";
import { Discipline } from "types/discipline";
import { Evaluation } from "types/evaluation";
import { formatDate, formatDateWithHour } from "utils/formatDate";

type Props = {
  discipline: Discipline;
  setDiscipline: (discipline: Discipline | null) => void;
};

export function DisciplineContent({ discipline, setDiscipline }: Props) {
  const { user } = useAuth();

  const { data: evaluationsData, isLoading: evaluationsLoading } = useQuery({
    queryKey: ["evaluations", discipline.code],
    queryFn: () => findEvaluationsByDisciplineCode(discipline.code),
  });

  const evaluations = useMemo(() => evaluationsData || [], [evaluationsData]);

  const { data: gradesData, isLoading: gradesLoading } = useQuery({
    queryKey: ["grades", user?.id],
    queryFn: () => findGradesByStudentId(user?.id as string),
    enabled: !!user?.id,
  });

  const grades = useMemo(() => gradesData || [], [gradesData]);

  const getGradeByEvaluation = (evaluation: Evaluation) => {
    return grades.find((grade) => grade.evaluation.id === evaluation.id);
  };

  if (evaluationsLoading || gradesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

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
