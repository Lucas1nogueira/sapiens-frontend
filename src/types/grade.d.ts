import { Evaluation } from "./evaluation";
import { Student } from "./student";

export type Grade = {
  id: string;
  value: number;
  student: Student;
  evaluation: Evaluation;
};
