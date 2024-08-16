import { DisciplineContent } from "@components/Discipline/DisciplineContent";
import { SchoolClassContent } from "@components/SchoolClassContent/SchoolClassContent";
import { useAuth } from "@hooks/useAuth";
import { LoadingPage } from "@pages/LoadingPage";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";

export function StudentSchoolClass() {
  const { user } = useAuth();
  const [schoolClass, setSchoolClass] = useState<SchoolClass>();
  const [discipline, setDiscipline] = useState<Discipline | null>(null);

  useEffect(() => {
    api
      .get<SchoolClass>(`school-class/student/${user?.id}`)
      .then((response) => setSchoolClass(response.data))
      .catch((error) => console.log(error.response.data));
  }, [user?.id]);

  if (!schoolClass) return <LoadingPage />;

  return (
    <div>
      {!discipline ? (
        <SchoolClassContent
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
