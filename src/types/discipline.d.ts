import { Evaluation } from "./evaluation";
import { Schedule } from "./schedule";
import { SchoolClass } from "./schoolClass";
import { Teacher } from "./teacher";

export type Discipline = {
  code: string;
  name: string;
  teacher: Teacher;
  schoolClass: SchoolClass;
  evaluations: Evaluation[];
  schedule: Schedule[];
};
