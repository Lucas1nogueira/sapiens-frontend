import { Discipline } from "types/discipline";
import { api } from "./api";
import { DisciplineProgress } from "types/disciplineProgress";

export const findAllDisciplines = async () => {
  const response = await api.get<Discipline[]>("discipline/all");
  return response;
};

export const updateDiscipline = async (discipline: Discipline) => {
  const response = await api.put("discipline/update", discipline);
  return response;
};

export const deleteDiscipline = async (id: string) => {
  const response = await api.delete(`discipline/delete/${id}`);
  return response;
};

export const disciplineProgress = async (code: string) => {
  const response = await api.get<DisciplineProgress>(
    `discipline/progress/${code}`
  );
  return response;
};

export const findAllDisciplinesBySchool = async (schoolId: string) => {
  const response = await api.get<Discipline[]>(`discipline/school/${schoolId}`);
  return response;
};
