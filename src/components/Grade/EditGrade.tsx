import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { findGradesByEvaluation, saveGrades } from "services/gradeService";
import { Evaluation } from "types/evaluation";
import { Grade } from "types/grade";
import { Student } from "types/student";

type Props = {
  evaluation: Evaluation;
};

export function EditGrade({ evaluation }: Props) {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!evaluation) {
      return setError("Selecione uma atividade.");
    }

    saveGrades(grades)
      .then(() => {
        setGrades([]);
        setErrors({});

        setSuccess("Notas atualizadas com sucesso!");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const handleAsssignGrade = (student: Student, value: string) => {
    if (!evaluation) {
      setGrades([]);
      return setError("Selecione uma atividade.");
    }

    const gradeValue = parseFloat(value);
    const errorMessages = { ...errors };

    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 10) {
      errorMessages[student.id] = "Nota deve estar entre 0 e 10.";
    } else {
      delete errorMessages[student.id];

      const updatedGrades = grades.map((grade) => {
        if (grade.student.id === student.id) {
          return { ...grade, value: gradeValue };
        }
        return grade;
      });

      if (!updatedGrades.find((grade) => grade.student.id === student.id)) {
        updatedGrades.push({
          id: null as unknown as string,
          student,
          evaluation,
          value: gradeValue,
        });
      }

      setGrades(updatedGrades);
    }

    setErrors(errorMessages);
  };

  useEffect(() => {
    findGradesByEvaluation(evaluation.id)
      .then((response) => setGrades(response.data))
      .catch((error) => console.log(error.response.data));
  }, [evaluation.id]);

  return (
    <Card shadow="none">
      <CardHeader className="flex justify-between">
        <h1>Atividade: {evaluation?.name}</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
          {grades.map((grade) => (
            <div
              className="flex justify-between items-center gap-2 flex-col md:flex-row bg-gray-300 rounded-md p-2 mb-2"
              key={grade.student.id}
            >
              <Input
                label="Nota"
                type="number"
                min={0}
                max={10}
                step="0.01"
                placeholder="Insira a nota da atividade"
                value={grade.value.toString()}
                onValueChange={(value) =>
                  handleAsssignGrade(grade.student, value)
                }
                className="max-w-64 w-full"
                errorMessage={errors[grade.student.id]}
                isInvalid={!!errors[grade.student.id]}
                isRequired
              />
              <div className="flex flex-col items-center">
                <p>Aluno: {grade.student.name}</p>
                <p>Matricula: {grade.student.matriculation}</p>
                <Button
                  color="primary"
                  className="disabled:bg-slate-500 disabled:cursor-not-allowed"
                  disabled
                >
                  Ver Atividade
                </Button>
              </div>
            </div>
          ))}

          <Button
            color="primary"
            type="submit"
            className="max-w-96 w-full mt-4"
          >
            Atualizar
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
