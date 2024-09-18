type SubjectGrade = {
  id: string;
  value: number;
  evaluation: Evaluation;
};

export type Subject = {
  disciplineCode: string;
  disciplineName: string;
  manyLessons: number;
  completedLessons: number;
  lessonsAttended: number;
  lessonsMissed: number;
  attendancePercentage: number;
  status: string;
  finalGrade: number;
  grades: SubjectGrade[];
};

export type Report = {
  studentName: string;
  matriculation: string;
  subjects: Subject[];
};
