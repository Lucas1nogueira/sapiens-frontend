import { DisciplineCard } from "@components/Discipline/DisciplineCard";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";

type Props = {
  setDiscipline: (discipline: Discipline | null) => void;
  schoolClass: SchoolClass;
  disciplines: Discipline[];
};

export function SchoolClassContent({
  setDiscipline,
  schoolClass,
  disciplines,
}: Props) {
  return (
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
  );
}
