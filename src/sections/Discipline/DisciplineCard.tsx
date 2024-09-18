import { Loading } from "@components/Common/Loading";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Progress,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { disciplineProgress } from "services/disciplineService";
import { findEvaluationsByDisciplineCode } from "services/evaluationService";
import { Discipline } from "types/discipline";
import { DisciplineProgress } from "types/disciplineProgress";
import { SchoolClass } from "types/schoolClass";

type Props = {
  discipline: Discipline;
  schoolClass: SchoolClass;
  setDiscipline: (discipline: Discipline | null) => void;
  setSchoolClass: (schoolClass: SchoolClass | null) => void;
};

export function DisciplineCard({
  discipline,
  schoolClass,
  setDiscipline,
  setSchoolClass,
}: Props) {
  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ["progress", discipline.code],
    queryFn: () => disciplineProgress(discipline.code),
  });

  const { data: evaluationsData, isLoading: evaluationsLoading } = useQuery({
    queryKey: ["evaluations", discipline.code],
    queryFn: () => findEvaluationsByDisciplineCode(discipline.code),
  });

  const progress = useMemo(
    () => progressData || ({} as DisciplineProgress),
    [progressData]
  );

  const evaluations = useMemo(() => evaluationsData || [], [evaluationsData]);

  const progressParsed = useMemo(() => {
    const { progress: progressValue } = progress;

    if (!progressValue) return 0;

    return parseFloat(progressValue + "");
  }, [progress]);

  return (
    <Card className="py-4" key={discipline.code}>
      <CardHeader
        className="pb-0 pt-2 px-4 flex flex-col gap-2"
        onClick={() => {
          setDiscipline(discipline);
          setSchoolClass(schoolClass);
        }}
      >
        <div className="flex justify-between w-full">
          <div className="hover:underline cursor-pointer">
            <p className="text-tiny uppercase font-bold">{discipline.name}</p>
            <p className="text-xs">{discipline?.teacher?.name}</p>
          </div>
          <Avatar
            isBordered
            radius="sm"
            name={`${
              discipline?.teacher?.name.split(" ")[0] ||
              discipline?.teacher?.name
            }`}
          />
        </div>
        {progressLoading ? (
          <div className="flex justify-center items-center p-4">
            <Loading />
          </div>
        ) : (
          <div className="w-full bg-zinc-100/40 p-2 my-2 rounded-md">
            <p className="text-xs">Quantidade de Alunos: {progress.students}</p>
            <p className="text-xs">
              Aulas Ministradas: {progress.lessonsCompleted} de{" "}
              {progress.totalLessons}
            </p>
            <Progress
              size="md"
              color={progressParsed > 50 ? "success" : "warning"}
              className="h-10"
              label="Progresso"
              classNames={{
                label: "text-xs",
                value: "text-xs",
              }}
              value={progressParsed}
              showValueLabel={true}
            />
          </div>
        )}
      </CardHeader>
      <CardBody className="overflow-visible">
        {evaluationsLoading ? (
          <div className="flex justify-center items-center p-4">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <Divider />
            {evaluations.slice(0, 3).map((evaluation, index) => (
              <p key={evaluation.id} className="text-xs">
                {index + 1}. {evaluation.name}
              </p>
            ))}
            {evaluations.length > 3 && <p className="text-xs">...</p>}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
