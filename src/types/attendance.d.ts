import { Lesson } from "./lesson";
import { Student } from "./student";

export type Attendance = {
  id: string;
  student: Student;
  lesson: Lesson;
  isPresent: boolean;
  attendedCount: number;
};
