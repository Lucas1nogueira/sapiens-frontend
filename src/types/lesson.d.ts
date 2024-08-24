import { Attendance } from "./attendance";
import { Discipline } from "./discipline";

export type Lesson = {
  id: string;
  description: string;
  date: string;
  manyLessons: number;
  discipline: Discipline;
  attendances: Attendance[];
};
