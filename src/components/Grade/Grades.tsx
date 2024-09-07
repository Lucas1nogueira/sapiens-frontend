import { useEffect, useMemo, useState } from "react";
import { Button, Input, Card, CardBody, CardHeader } from "@nextui-org/react";
import { saveManyGrades, findGradesByEvaluation } from "services/gradeService";
import { findEvaluationsByDisciplineCode } from "services/evaluationService";
import { Evaluation } from "types/evaluation";
import { Grade } from "types/grade";
import { Student } from "types/student";
import { Discipline } from "types/discipline";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  students: Student[];
  discipline: Discipline;
};

export function Grades({ students, discipline }: Props) {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [grades, setGrades] = useState<{ [key: string]: Grade[] }>({});
  const [filterValue, setFilterValue] = useState<string>("");

  const studentsToDisplay = useMemo(() => {
    if (!filterValue) return students;

    return students.filter((student) =>
      student.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [students, filterValue]);

  useEffect(() => {
    findEvaluationsByDisciplineCode(discipline.code)
      .then((response) => {
        setEvaluations(response.data);

        response.data.forEach((evaluation: Evaluation) => {
          findGradesByEvaluation(evaluation.id)
            .then((gradeResponse) => {
              setGrades((prevGrades) => ({
                ...prevGrades,
                [evaluation.id]: gradeResponse.data,
              }));
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((error) => console.log(error));
  }, [discipline.code]);

  const handleGradeChange = (
    evaluationId: string,
    studentId: string,
    value: number
  ) => {
    setGrades((prevGrades) => {
      const updatedGrades = [...(prevGrades[evaluationId] || [])];
      const gradeIndex = updatedGrades.findIndex(
        (grade) => grade.student.id === studentId
      );

      if (gradeIndex >= 0) {
        updatedGrades[gradeIndex] = {
          ...updatedGrades[gradeIndex],
          value,
        };
      } else {
        updatedGrades.push({
          id: null as unknown as string,
          student: students.find((s) => s.id === studentId) as Student,
          evaluation: evaluations.find(
            (e) => e.id === evaluationId
          ) as Evaluation,
          value,
        });
      }

      return {
        ...prevGrades,
        [evaluationId]: updatedGrades,
      };
    });
  };

  const handleSubmit = () => {
    const allGrades = Object.values(grades).flat();
    saveManyGrades(allGrades)
      .then(() => {
        enqueueNotification("Notas salvas com sucesso!", "success");
      })
      .catch((error) => enqueueNotification(error.response.data, "error"));
  };

  const findGradeByEvaluationAndStudent = (
    evaluationId: string,
    studentId: string
  ) => {
    return grades[evaluationId]?.find(
      (grade) => grade.student.id === studentId
    );
  };

  return (
    <Card shadow="none">
      <CardHeader className="flex justify-between gap-2 flex-col sm:flex-row">
        <h1 className="text-xl">Notas dos Alunos</h1>
        <Input
          placeholder="Pesquisar Aluno..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="w-full sm:w-1/3"
        />
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {studentsToDisplay.map((student) => (
              <div key={student.id} className="mb-6">
                <h2 className="font-semibold">{student.name}</h2>
                <div className="flex flex-col bg-gray-100 rounded-lg p-4">
                  {evaluations.map((evaluation) => (
                    <div key={evaluation.id} className="flex items-center mb-2">
                      <div className="w-1/2 pr-4">{evaluation.name}</div>
                      <div className="w-1/4 pr-4">
                        <Input
                          color="primary"
                          type="number"
                          step="0.01"
                          min={0}
                          max={10}
                          value={
                            findGradeByEvaluationAndStudent(
                              evaluation.id,
                              student.id
                            )?.value.toString() || "0"
                          }
                          onChange={(e) =>
                            handleGradeChange(
                              evaluation.id,
                              student.id,
                              e.target.valueAsNumber
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button color="primary" onClick={handleSubmit} className="mt-4 w-full">
          Salvar Todas as Notas
        </Button>
      </CardBody>
    </Card>
  );
}
