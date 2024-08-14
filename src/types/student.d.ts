import { Grade } from "./grade";
import { SchoolClass } from "./schoolClass";
import { User } from "./user";

export type Student = User & {
  matriculation: string;
  age: number;
  sex: string;
  schoolClass: SchoolClass;
  grades: Grade[];
};
