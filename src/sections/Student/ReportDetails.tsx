import { Subject } from "types/report";

type Props = {
  subject: Subject;
};

export function ReportDetails({ subject }: Props) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Detalhes da Disciplina</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <p className="text-lg font-medium">
            Disciplina:{" "}
            <span className="font-normal">{subject.disciplineName}</span>
          </p>
        </div>
        <p className="text-lg font-medium">
          Aulas: <span className="font-normal">{subject.manyLessons}</span>
        </p>
        <p className="text-lg font-medium">
          Faltas: <span className="font-normal">{subject.lessonsMissed}</span>
        </p>
        <p className="text-lg font-medium">
          Presenças:{" "}
          <span className="font-normal">{subject.lessonsAttended}</span>
        </p>
        <p className="text-lg font-medium">
          Percentual de Frequência:{" "}
          <span className="font-normal">
            {subject.attendancePercentage.toFixed(2)}%
          </span>
        </p>
        <p className="text-lg font-medium">
          Situação: <span className="font-normal">{subject.status}</span>
        </p>
        <p className="text-lg font-medium">
          Nota Final:{" "}
          <span className="font-normal">{subject.finalGrade.toFixed(2)}</span>
        </p>
      </div>

      {subject.grades.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Notas das Avaliações</h3>
          <ul className="list-disc pl-5 space-y-1">
            {subject.grades.map((grade) => (
              <li key={grade.id} className="text-lg">
                <span className="font-medium">{grade.evaluation.name}:</span>{" "}
                {grade.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
