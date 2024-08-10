import { Discipline } from "./discipline";
import { Student } from "./student";
import { Teacher } from "./teacher";

export type SchoolClass = {
  code: string;
  students: Student[];
  disciplines: Discipline[];
  teachers: Teacher[];
};
