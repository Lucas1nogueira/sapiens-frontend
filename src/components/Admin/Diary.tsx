import { DisciplineCard } from "@components/Discipline/DisciplineCard";
import { SchoolClassDiscipline } from "@components/Teacher/SchoolClassDiscipline";
import { useAuth } from "@hooks/useAuth";
import { LoadingPage } from "@pages/LoadingPage";
import { useEffect, useState } from "react";
import {
  findAllDisciplines,
  findAllDisciplinesBySchool,
} from "services/disciplineService";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";

export function Diary() {
  const { userSchool } = useAuth();
  const [disciplines, setDisciplines] = useState<Discipline[] | null>(null);
  const [discipline, setDiscipline] = useState<Discipline | null>(null);

  useEffect(() => {
    if (userSchool) {
      if (userSchool.name === "Todas as Escolas") {
        findAllDisciplines()
          .then((response) => setDisciplines(response.data))
          .catch((error) => console.log(error));
      } else {
        findAllDisciplinesBySchool(userSchool?.id as string)
          .then((response) => setDisciplines(response.data))
          .catch((error) => console.log(error));
      }
    }
  }, [userSchool]);

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
