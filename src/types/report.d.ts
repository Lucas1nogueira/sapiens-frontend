import { Grade } from "./grade";

export type Subject = {
  disciplineCode: string;
  disciplineName: string;
  manyLessons: number;
  lessonsAttended: number;
  lessonsMissed: number;
  attendancePercentage: number;
  status: string;
  finalGrade: number;
  grades: Grade[];
};

export type Report = {
  studentName: string;
  matriculation: string;
  subjects: Subject[];
};
