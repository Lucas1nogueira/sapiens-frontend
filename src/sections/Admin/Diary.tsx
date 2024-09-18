import { SchoolClassDiscipline } from "sections/Teacher/SchoolClassDiscipline";
import { useAuth } from "@hooks/useAuth";
import { useMemo, useState } from "react";
import {
  findAllDisciplines,
  findAllDisciplinesBySchool,
} from "services/disciplineService";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";
import { DisciplineCard } from "sections/Discipline/DisciplineCard";
import { useQuery } from "@tanstack/react-query";
import { LoadingPage } from "@pages/LoadingPage";

export function Diary() {
  const { userSchool } = useAuth();
  const [discipline, setDiscipline] = useState<Discipline | null>(null);

  const queryFn = useMemo(() => {
    if (!userSchool) return undefined;

    return userSchool.name === "Todas as Escolas"
      ? findAllDisciplines
      : () => findAllDisciplinesBySchool(userSchool?.id as string);
  }, [userSchool]);

  const { data: disciplinesData, isLoading: disciplinesLoading } = useQuery({
    queryKey: ["disciplines", userSchool?.name],
    queryFn,
  });

  const disciplines = useMemo(() => disciplinesData || [], [disciplinesData]);

  if (disciplinesLoading) return <LoadingPage />;

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
