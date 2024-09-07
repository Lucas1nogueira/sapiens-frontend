import { Grades } from "@components/Grade/Grades";
import { Discipline } from "types/discipline";
import { Student } from "types/student";

type Props = {
  sortedStudents: Student[];
  discipline: Discipline;
};

export function GradesTab({ sortedStudents, discipline }: Props) {
  return <Grades students={sortedStudents} discipline={discipline} />;
}
