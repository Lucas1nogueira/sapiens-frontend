import { DisciplineContent } from "@components/Discipline/DisciplineContent";
import { SchoolClassContent } from "@components/SchoolClass/SchoolClassContent";
import { useState } from "react";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";

type Props = {
  schoolClass: SchoolClass;
  disciplines: Discipline[];
};

export function StudentSchoolClass({ schoolClass, disciplines }: Props) {
  const [discipline, setDiscipline] = useState<Discipline | null>(null);

  return (
    <div>
      {!discipline ? (
        <SchoolClassContent
          disciplines={disciplines}
          schoolClass={schoolClass}
          setDiscipline={setDiscipline}
        />
      ) : (
        <DisciplineContent
          discipline={discipline}
          setDiscipline={setDiscipline}
        />
      )}
    </div>
  );
}
