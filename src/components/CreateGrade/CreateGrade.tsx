import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { saveGrades } from "services/gradeService";
import { Discipline } from "types/discipline";
import { Evaluation } from "types/evaluation";
import { Grade } from "types/grade";
import { Student } from "types/student";

type Props = {
  discipline: Discipline;
  students: Student[];
  evaluations: Evaluation[];
};

export function CreateGrade({ discipline, students, evaluations }: Props) {
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
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

        setSuccess("Notas salvas com sucesso!");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  const handleSelectionChange = (value: string) => {
    const selectedEvaluation = evaluations.find(
      (evaluation) => evaluation.id.toString() === value
    );

    if (selectedEvaluation) setEvaluation(selectedEvaluation);
  };

  // TODO: Improve validation //
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

  return (
    <Card shadow="none">
      <CardHeader className="flex justify-between">
        <h1>Disciplina: {discipline.name}</h1>
        <Autocomplete
          defaultItems={evaluations}
          label="Atividades"
          placeholder="Buscar por atividade"
          className="max-w-xs"
          value={evaluation?.id}
          onSelectionChange={(value) =>
            handleSelectionChange(value?.toString() ?? "")
          }
        >
          {(evaluation) => (
            <AutocompleteItem key={evaluation.id}>
              {evaluation.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </CardHeader>
      <CardBody>
        <h1 className="text-xl mb-4">
          Atibua as notas da atividade: {evaluation?.name}
        </h1>
        <form onSubmit={handleSubmit}>
          {students.map((student) => (
            <div className="flex gap-2 items-center mb-2" key={student.id}>
              <Input
                label="Nota"
                type="number"
                min={0}
                max={10}
                placeholder="Insira a nota da atividade"
                onValueChange={(value) => handleAsssignGrade(student, value)}
                className="w-64"
                errorMessage={errors[student.id]}
                isInvalid={!!errors[student.id]}
                isRequired
              />
              <p>{student.name}</p>
              <p>{student.matriculation}</p>
              <Button
                color="primary"
                className="disabled:bg-slate-500 disabled:cursor-not-allowed"
                disabled
              >
                Ver Atividade
              </Button>
            </div>
          ))}

          <Button
            color="primary"
            type="submit"
            className="max-w-96 w-full mt-4"
          >
            Lançar
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
