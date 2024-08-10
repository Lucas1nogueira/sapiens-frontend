import { SchoolClass } from "types/schoolClass";
import { api } from "./api";

export const saveSchoolClass = async (schoolClass: SchoolClass) => {
  const response = await api.post("school-class/save", schoolClass);
  return response;
};

export const updateSchoolClass = async (schoolClass: SchoolClass) => {
  const response = await api.put("school-class/update", schoolClass);
  return response;
};

export const findAllSchoolClasses = async () => {
  const response = await api.get<SchoolClass[]>("school-class/all");
  return response;
};

export const findSchoolClassByCode = async (code: string) => {
  const response = await api.get<SchoolClass>(`school-class/code/${code}`);
  return response;
};

export const findSchoolClassByTeacherId = async (id: string) => {
  const response = await api.get<SchoolClass[]>(`school-class/teacher/${id}`);
  return response;
};
