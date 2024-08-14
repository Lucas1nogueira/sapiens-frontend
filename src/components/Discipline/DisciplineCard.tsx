import { useError } from "@hooks/useError";
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";
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
  const { setError } = useError();

  useEffect(() => {
    api
      .get<Evaluation[]>(`evaluation/discipline/${discipline.code}`)
      .then((response) => setEvaluations(response.data))
      .catch((error) => setError(error.response.data));
  }, [discipline.code, setError]);

  return (
    <Card className="py-4" key={discipline.code}>
      <CardHeader
        className="pb-0 pt-2 px-4 flex justify-between items-center hover:underline cursor-pointer"
        onClick={() => {
          setDiscipline(discipline);
          setSchoolClass(schoolClass);
        }}
      >
        <div>
          <p className="text-tiny uppercase font-bold">{discipline.name}</p>
          <p className="text-xs">{discipline.teacher.name}</p>
        </div>
        <Avatar
          isBordered
          radius="sm"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Divider />
        {evaluations.slice(0, 3).map((evaluation) => (
          <p key={evaluation.id} className="text-xs">
            {evaluation.name}
          </p>
        ))}
        {evaluations.length > 3 && <p className="text-xs">...</p>}
      </CardBody>
    </Card>
  );
}
