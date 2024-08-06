import { Discipline } from "./discipline";
import { Student } from "./student";
import { Teacher } from "./teacher";

export type GroupCollege = {
  groupCode: string;
  studentAmount: number;
  students: Student[];
  disciplines: Discipline[];
  teachers: Teacher[];
};
