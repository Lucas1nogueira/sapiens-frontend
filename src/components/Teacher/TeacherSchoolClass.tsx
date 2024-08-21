import { DisciplineCard } from "@components/Discipline/DisciplineCard";
import { LoadingPage } from "@pages/LoadingPage";
import { useState } from "react";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";
import { SchoolClassDiscipline } from "./SchoolClassDiscipline";

type Props = {
  disciplines: Discipline[];
};

export function TeacherSchoolClass({ disciplines }: Props) {
  const [discipline, setDiscipline] = useState<Discipline | null>(null);

  if (!disciplines) return <LoadingPage />;

  return (
    <>
      {!discipline ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {disciplines.map((discipline) => (
            <DisciplineCard
              key={discipline.code}
              discipline={discipline}
              schoolClass={null as unknown as SchoolClass}
              setDiscipline={setDiscipline}
              setSchoolClass={() => null}
            />
          ))}
        </div>
      ) : (
        <SchoolClassDiscipline
          discipline={discipline}
          setDiscipline={setDiscipline}
        />
      )}
    </>
  );
}
