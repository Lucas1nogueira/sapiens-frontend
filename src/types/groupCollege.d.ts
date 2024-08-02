import { Student } from "./student";

export type GroupCollege = {
  groupCode: string;
  studentAmount: number;
  students: Student[];
};
