import {
  Accordion,
  AccordionItem,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";

type Props = {
  setDiscipline: (discipline: Discipline | null) => void;
  schoolClasses: SchoolClass[];
};

const evaluations: { key: string; label: string }[] = [
  { key: "personas", label: "Atividade de Personas" },
  { key: "discipline", label: "Atividade de Disciplina" },
  { key: "independence", label: "Independência" },
  { key: "social", label: "Social" },
  { key: "communication", label: "Comunicação" },
];

export function SchoolClassContent({ setDiscipline, schoolClasses }: Props) {
  return (
    <Accordion variant="shadow" defaultExpandedKeys={["schoolClass"]}>
      {schoolClasses.map((schoolClass) => (
        <AccordionItem
          key="schoolClass"
          aria-label="Turma"
          title={schoolClass.code}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {schoolClass.disciplines.map((discipline) => (
              <Card className="py-4" key={discipline.code}>
                <CardHeader
                  className="pb-0 pt-2 px-4 flex justify-between items-center hover:underline cursor-pointer"
                  onClick={() => setDiscipline(discipline)}
                >
                  <div>
                    <p className="text-tiny uppercase font-bold">
                      {discipline.name}
                    </p>
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
            ))}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
