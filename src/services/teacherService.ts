import { Teacher } from "types/teacher";
import { api } from "./api";

export const saveTeacher = async (teacher: Teacher) => {
  const response = await api.post("teacher/save", teacher);
  return response;
};

export const updateTeacher = async (teacher: Teacher) => {
  const response = await api.put("teacher/update", teacher);
  return response;
};

export const findAllTeachers = async () => {
  const response = await api.get<Teacher[]>("teacher/all");
  return response;
};

export const findTeacherByEmail = async (email: string) => {
  const response = await api.get<Teacher>(`teacher/email/${email}`);
  return response;
};

export const findTeacherByCode = async (code: string) => {
  const response = await api.get<Teacher>(`teacher/code/${code}`);
  return response;
};

export const findTeacherBySchoolId = async (id: string) => {
  const response = await api.get<Teacher[]>(`teacher/school/${id}`);
  return response;
};
