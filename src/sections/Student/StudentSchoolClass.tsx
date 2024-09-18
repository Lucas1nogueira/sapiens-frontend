import { SchoolClassContent } from "sections/SchoolClass/SchoolClassContent";
import { useState } from "react";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";
import { DisciplineContent } from "sections/Discipline/DisciplineContent";

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
