import { DisciplineCard } from "@components/Discipline/DisciplineCard";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";

type Props = {
  setDiscipline: (discipline: Discipline | null) => void;
  schoolClass: SchoolClass;
};

export function SchoolClassContent({ setDiscipline, schoolClass }: Props) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    api
      .get<Discipline[]>(`discipline/class/${schoolClass.code}`)
      .then((response) => setDisciplines(response.data))
      .catch((error) => console.log(error));
  }, [schoolClass.code]);

  return (
    <Accordion variant="shadow" defaultExpandedKeys={[schoolClass.code]}>
      <AccordionItem
        key={schoolClass.code}
        aria-label="Turma"
        title={schoolClass.code}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {disciplines.map((discipline) => (
            <DisciplineCard
              key={discipline.code}
              discipline={discipline}
              schoolClass={schoolClass}
              setDiscipline={setDiscipline}
              setSchoolClass={() => null}
            />
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
