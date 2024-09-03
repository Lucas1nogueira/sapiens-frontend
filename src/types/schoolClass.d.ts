import { Discipline } from "./discipline";
import { School } from "./school";
import { Student } from "./student";

export type SchoolClass = {
  code: string;
  students: Student[];
  disciplines: Discipline[];
  school: School;
};
