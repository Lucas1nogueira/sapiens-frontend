import { DisciplineCard } from "@components/Discipline/DisciplineCard";
import { useAuth } from "@hooks/useAuth";
import { LoadingPage } from "@pages/LoadingPage";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";
import { SchoolClassDiscipline } from "./SchoolClassDiscipline";

export function TeacherSchoolClass() {
  const { user } = useAuth();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [discipline, setDiscipline] = useState<Discipline | null>(null);

  useEffect(() => {
    api
      .get<Discipline[]>(`discipline/teacher/${user?.id}`)
      .then((response) => setDisciplines(response.data));
  }, [user?.id]);

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
