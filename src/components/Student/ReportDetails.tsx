import { Report, Subject } from "types/report";

type Props = {
  report: Report;
  subject: Subject;
};

export function ReportDetails({ report, subject }: Props) {
  return (
    <>
      <p>Disciplina: {subject.disciplineName}</p>
      <p>Aulas: {subject.manyLessons}</p>
      <p>Faltas: {subject.lessonsMissed}</p>
      <p>Presença: {subject.lessonsAttended}</p>
      <p>Situação: {subject.status}</p>
      <p>Nota: {subject.finalGrade}</p>
    </>
  );
}
