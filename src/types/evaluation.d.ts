import { Discipline } from "./discipline";
import { Grade } from "./grade";
import { Student } from "./student";

export type Evaluation = {
  id: string;
  name: string;
  student: Student;
  discipline: Discipline;
  grades: Grade[];
};
