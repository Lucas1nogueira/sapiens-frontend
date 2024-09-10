import { Discipline } from "types/discipline";
import { api } from "./api";
import { DisciplineProgress } from "types/disciplineProgress";

export const findAllDisciplines = async () => {
  const response = await api.get<Discipline[]>("discipline/all");
  return response;
};

export const updateDiscipline = async (
  code: string,
  discipline: Discipline
) => {
  const response = await api.put(`discipline/update/${code}`, discipline);
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

export const saveDiscipline = async (discipline: Discipline) => {
  const response = await api.post("discipline/save", discipline);
  return response;
};

export const findDisciplineByCode = async (code: string) => {
  const response = await api.get<Discipline>(`discipline/code/${code}`);
  return response;
};

export const findDisciplineByName = async (name: string) => {
  const response = await api.get<Discipline>(`discipline/name/${name}`);
  return response;
};

export const findDisciplineByTeacherId = async (id: string) => {
  const response = await api.get<Discipline[]>(`discipline/teacher/${id}`);
  return response;
};

export const findDisciplineBySchoolClassCode = async (code: string) => {
  const response = await api.get<Discipline[]>(`discipline/class/${code}`);
  return response;
};
