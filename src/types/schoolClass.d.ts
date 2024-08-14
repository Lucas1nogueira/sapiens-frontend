import { Discipline } from "./discipline";
import { Student } from "./student";

export type SchoolClass = {
  code: string;
  students: Student[];
  disciplines: Discipline[];
};
