import { Attendance } from "./attendance";
import { Grade } from "./grade";
import { School } from "./school";
import { SchoolClass } from "./schoolClass";
import { User } from "./user";

export type Student = User & {
  matriculation: string;
  age: number;
  sex: string;
  schoolClass: SchoolClass;
  grades: Grade[];
  attendances: Attendance[];
  school: School;
};
