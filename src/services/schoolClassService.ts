import { SchoolClass } from "types/schoolClass";
import { api } from "./api";

export const saveSchoolClass = async (schoolClass: SchoolClass) => {
  const response = await api.post("school-class/save", schoolClass);
  return response;
};

export const assignStudentsToSchoolClass = async (schoolClass: SchoolClass) => {
  const response = await api.put("school-class/assign-students", schoolClass);
  return response;
};

export const assignDisciplinesToSchoolClass = async (
  schoolClass: SchoolClass
) => {
  const response = await api.put(
    "school-class/assign-disciplines",
    schoolClass
  );
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

export const findSchoolClassBySchoolId = async (schoolId: string) => {
  const response = await api.get<SchoolClass[]>(
    `school-class/school/${schoolId}`
  );
  return response;
};

export const getSchoolClassStudentsByDisciplineCode = async (code: string) => {
  const response = await api.get<SchoolClass[]>(
    `school-class/students-discipline/${code}`
  );
  return response;
};

export const findSchoolClassStudentId = async (id: string) => {
  const response = await api.get<SchoolClass>(`school-class/student/${id}`);
  return response;
};
