import { School } from "types/school";
import { api } from "./api";

export const saveSchool = async (school: School) => {
  const response = await api.post("school/save", school);
  return response;
};

export const updateSchool = async (school: School) => {
  const response = await api.put("school/update", school);
  return response;
};

export const findAllSchools = async () => {
  const response = await api.get<School[]>("school/all");
  return response;
};

export const findSchoolByAdminId = async (id: string) => {
  const response = await api.get<School>(`school/admin/${id}`);
  return response;
};

export const findSchoolBySecretariatId = async (id: string) => {
  const response = await api.get<School>(`school/secretariat/${id}`);
  return response;
};

export const findSchoolByStudentsId = async (id: string) => {
  const response = await api.get<School>(`school/students/${id}`);
  return response;
};

export const findSchoolByTeachersId = async (id: string) => {
  const response = await api.get<School>(`school/teachers/${id}`);
  return response;
};

export const findSchoolByDisciplinesCode = async (code: string) => {
  const response = await api.get<School>(`school/disciplines/${code}`);
  return response;
};

export const findSchoolBySchoolClassesCode = async (code: string) => {
  const response = await api.get<School>(`school/classes/${code}`);
  return response;
};
