import { Teacher } from "types/teacher";
import { api } from "./api";

export const saveTeacher = async (teacher: Teacher) => {
  const response = await api.post("teacher/save", teacher);
  return response.data;
};

export const updateTeacher = async (teacher: Teacher) => {
  const response = await api.put("teacher/update", teacher);
  return response.data;
};

export const findAllTeachers = async () => {
  const response = await api.get<Teacher[]>("teacher/all");
  return response.data;
};

export const findTeacherByEmail = async (email: string) => {
  const response = await api.get<Teacher>(`teacher/email/${email}`);
  return response.data;
};

export const findTeacherByCode = async (code: string) => {
  const response = await api.get<Teacher>(`teacher/code/${code}`);
  return response.data;
};

export const findTeacherBySchoolId = async (id: string): Promise<Teacher[]> => {
  const response = await api.get<Teacher[]>(`teacher/school/${id}`);
  return response.data;
};
