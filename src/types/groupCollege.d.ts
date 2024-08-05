import { Discipline } from "./discipline";
import { Student } from "./student";

export type GroupCollege = {
  groupCode: string;
  studentAmount: number;
  students: Student[];
  disciplines: Discipline[];
};
