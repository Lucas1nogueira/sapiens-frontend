import { Evaluation } from "./evaluation";
import { SchoolClass } from "./schoolClass";
import { Teacher } from "./teacher";

export type Discipline = {
  code: string;
  name: string;
  teacher: Teacher;
  schoolClass: SchoolClass;
  evaluations: Evaluation[];
};
