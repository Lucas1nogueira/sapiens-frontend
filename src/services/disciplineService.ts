import { Discipline } from "types/discipline";
import { api } from "./api";
import { DisciplineProgress } from "types/disciplineProgress";

export const findAllDisciplines = async (): Promise<Discipline[]> => {
  const response = await api.get<Discipline[]>("discipline/all");
  return response.data;
};

export const updateDiscipline = async (
  code: string,
  discipline: Discipline
) => {
  const response = await api.put(`discipline/update/${code}`, discipline);
  return response.data;
};

export const deleteDiscipline = async (id: string) => {
  const response = await api.delete(`discipline/delete/${id}`);
  return response.data;
};

export const disciplineProgress = async (code: string) => {
  const response = await api.get<DisciplineProgress>(
    `discipline/progress/${code}`
  );
  return response.data;
};

export const findAllDisciplinesBySchool = async (
  schoolId: string
): Promise<Discipline[]> => {
  const response = await api.get<Discipline[]>(`discipline/school/${schoolId}`);
  return response.data;
};

export const saveDiscipline = async (discipline: Discipline) => {
  const response = await api.post("discipline/save", discipline);
  return response.data;
};

export const findDisciplineByCode = async (
  code: string
): Promise<Discipline> => {
  const response = await api.get<Discipline>(`discipline/code/${code}`);
  return response.data;
};

export const findDisciplineByName = async (
  name: string
): Promise<Discipline> => {
  const response = await api.get<Discipline>(`discipline/name/${name}`);
  return response.data;
};

export const findDisciplineByTeacherId = async (
  id: string
): Promise<Discipline[]> => {
  const response = await api.get<Discipline[]>(`discipline/teacher/${id}`);
  return response.data;
};

export const findDisciplineBySchoolClassCode = async (
  code: string
): Promise<Discipline[]> => {
  const response = await api.get<Discipline[]>(`discipline/class/${code}`);
  return response.data;
};
