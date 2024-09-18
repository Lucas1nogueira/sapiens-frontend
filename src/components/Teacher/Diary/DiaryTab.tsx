import { Button, Progress } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { disciplineProgress } from "services/disciplineService";
import { Discipline } from "types/discipline";
import { DisciplineProgress } from "types/disciplineProgress";

type Props = {
  handleTabChange: (newTab: string, breadcrumb: string) => void;
  discipline: Discipline;
};

export function DiaryTab({ handleTabChange, discipline }: Props) {
  const [progress, setProgress] = useState<DisciplineProgress>(
    {} as DisciplineProgress
  );

  useEffect(() => {
    disciplineProgress(discipline.code)
      .then((response) => {
        setProgress(response.data);
      })
      .catch((error) => console.log(error.response.data));
  }, [discipline.code]);

  const progressParsed = useMemo(() => {
    const { progress: progressValue } = progress;

    if (!progressValue) return 0;
    
    return parseFloat((progressValue + ""))
  }, [progress]);

  return (
    <>
      <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4">
        <p className="text-lg font-semibold text-gray-800">
          Turma:{" "}
          <span className="text-blue-600">{discipline?.schoolClass?.code}</span>
        </p>
        <p className="text-gray-700 mt-1">
          Quantidade de Alunos:{" "}
          <span className="font-medium">{progress.students}</span>
        </p>
        <p className="text-gray-700 mt-1">
          Aulas Ministradas:{" "}
          <span className="font-medium">{progress.lessonsCompleted}</span> de{" "}
          <span className="font-medium">{progress.totalLessons}</span>
        </p>
        <div className="mt-4">
          <Progress
            size="md"
            color={progressParsed > 50 ? "success" : "warning"}
            label="Carga Horária Cumprida"
            className="text-sm font-medium"
            value={progressParsed}
            showValueLabel={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4">
        <Button
          color="primary"
          onClick={() => handleTabChange("lesson", "Registro de Aulas")}
        >
          Registro de Aulas
        </Button>
        <Button
          color="primary"
          onClick={() =>
            handleTabChange("attendance", "Registro de Frequências")
          }
        >
          Registro de Frequências
        </Button>
        <Button
          color="primary"
          onClick={() =>
            handleTabChange("evaluations", "Registro de Avaliações")
          }
        >
          Registro de Avaliações
        </Button>
        <Button
          color="primary"
          onClick={() => handleTabChange("grades", "Registro de Notas")}
        >
          Registro de Notas
        </Button>
      </div>
    </>
  );
}
