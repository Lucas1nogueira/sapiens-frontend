import { Grade } from "types/grade";
import { api } from "./api";

export const saveOneGrade = async (grade: Grade) => {
  const response = await api.post("grade/save-one", grade);
  return response;
};

export const saveManyGrades = async (grades: Grade[]) => {
  const response = await api.post("grade/save-many", grades);
  return response;
};

export const findGradesByEvaluation = async (evaluationId: string) => {
  const response = await api.get<Grade[]>(`grade/evaluation/${evaluationId}`);
  return response;
};

export const findAllGrades = async () => {
  const response = await api.get<Grade[]>("grade/all");
  return response;
};

export const findGradesByStudentId = async (studentId: string) => {
  const response = await api.get<Grade[]>(`grade/student/${studentId}`);
  return response;
};

export const findGradeById = async (id: string) => {
  const response = await api.get<Grade>(`grade/${id}`);
  return response;
};
