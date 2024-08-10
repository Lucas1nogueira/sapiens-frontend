import { SchoolClass } from "./schoolClass";
import { User } from "./user";

export type Discipline = {
  disciplineCode: string;
  name: string;
  teacher: User;
  schoolClass: SchoolClass;
};
