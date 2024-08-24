import { Lesson } from "./lesson";
import { Student } from "./student";

export type Attendance = {
  id: string;
  date: string;
  student: Student;
  lesson: Lesson;
  isPresent: boolean;
  attendedCount: number;
};
