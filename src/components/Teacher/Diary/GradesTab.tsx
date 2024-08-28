import { Grades } from "@components/Grade/Grades";
import { Discipline } from "types/discipline";
import { Student } from "types/student";

type Props = {
  students: Student[];
  discipline: Discipline;
};

export function GradesTab({ students, discipline }: Props) {
  return <Grades students={students} discipline={discipline} />;
}
