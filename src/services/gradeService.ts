import { Grade } from "types/grade";
import { api } from "./api";

export const saveGrade = async (grade: Grade) => {
  const response = await api.post("grade/save-one", grade);
  return response;
};

export const saveGrades = async (grades: Grade[]) => {
  const response = await api.post("grade/save-many", grades);
  return response;
};
