import { Evaluation } from "./evaluation";
import { Lesson } from "./lesson";
import { Schedule } from "./schedule";
import { School } from "./school";
import { SchoolClass } from "./schoolClass";
import { Teacher } from "./teacher";

export type Discipline = {
  code: string;
  name: string;
  manyLessons: number;
  manyHours: number;
  teacher: Teacher;
  schoolClass: SchoolClass;
  evaluations: Evaluation[];
  schedule: Schedule[];
  lessons: Lesson[];
  school: School;
};
