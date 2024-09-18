import { Grade } from "types/grade";
import { api } from "./api";

export const saveOneGrade = async (grade: Grade) => {
  const response = await api.post("grade/save-one", grade);
  return response.data;
};

export const saveManyGrades = async (grades: Grade[]) => {
  const response = await api.post("grade/save-many", grades);
  return response.data;
};

export const findGradesByEvaluation = async (
  evaluationId: string
): Promise<Grade[]> => {
  const response = await api.get<Grade[]>(`grade/evaluation/${evaluationId}`);
  return response.data;
};

export const findAllGrades = async (): Promise<Grade[]> => {
  const response = await api.get<Grade[]>("grade/all");
  return response.data;
};

export const findGradesByStudentId = async (
  studentId: string
): Promise<Grade[]> => {
  const response = await api.get<Grade[]>(`grade/student/${studentId}`);
  return response.data;
};

export const findGradeById = async (id: string): Promise<Grade> => {
  const response = await api.get<Grade>(`grade/${id}`);
  return response.data;
};
