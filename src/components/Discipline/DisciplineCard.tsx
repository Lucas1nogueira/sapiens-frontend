import { useError } from "@hooks/useError";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Progress,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { disciplineProgress } from "services/disciplineService";
import { Discipline } from "types/discipline";
import { DisciplineProgress } from "types/disciplineProgress";
import { Evaluation } from "types/evaluation";
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
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [progress, setProgress] = useState<DisciplineProgress>(
    {} as DisciplineProgress
  );
  const { setError } = useError();

  useEffect(() => {
    api
      .get<Evaluation[]>(`evaluation/discipline/${discipline.code}`)
      .then((response) => setEvaluations(response.data))
      .catch((error) => setError(error.response.data));

    disciplineProgress(discipline.code)
      .then((response) => setProgress(response.data))
      .catch((error) => setError(error.response.data));
  }, [discipline.code, setError]);

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
            <p className="text-xs">{discipline.teacher.name}</p>
          </div>
          <Avatar
            isBordered
            radius="sm"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        </div>
        <div className="w-full bg-zinc-100/40 p-2 my-2 rounded-md">
          <p className="text-xs">Quntidade de Alunos: {progress.students}</p>
          <p className="text-xs">
            Aulas Ministradas: {progress.lessonsCompleted} de{" "}
            {progress.totalLessons}
          </p>
          <Progress
            size="md"
            color={progress.progress > 50 ? "success" : "warning"}
            className="h-10"
            label="Progresso"
            classNames={{
              label: "text-xs",
              value: "text-xs",
            }}
            value={progress.progress}
            showValueLabel={true}
          />
        </div>
      </CardHeader>
      <CardBody className="overflow-visible">
        <div className="flex flex-col gap-1">
          <Divider />
          {evaluations.slice(0, 3).map((evaluation, index) => (
            <p key={evaluation.id} className="text-xs">
              {index + 1}. {evaluation.name}
            </p>
          ))}
          {evaluations.length > 3 && <p className="text-xs">...</p>}
        </div>
      </CardBody>
    </Card>
  );
}
