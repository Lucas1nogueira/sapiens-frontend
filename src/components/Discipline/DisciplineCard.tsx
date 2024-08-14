import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";

const evaluations: { key: string; label: string }[] = [
  { key: "personas", label: "Atividade de Personas" },
  { key: "discipline", label: "Atividade de Disciplina" },
  { key: "independence", label: "Independência" },
  { key: "social", label: "Social" },
  { key: "communication", label: "Comunicação" },
];

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
          <p key={evaluation.key} className="text-xs">
            {evaluation.label}
          </p>
        ))}
        {evaluations.length > 3 && <p className="text-xs">...</p>}
      </CardBody>
    </Card>
  );
}
