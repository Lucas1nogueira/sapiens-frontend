import { Lesson } from "types/lesson";
import { api } from "./api";

export const findLessonsByDiscipline = async (
  code: string
): Promise<Lesson[]> => {
  const response = await api.get<Lesson[]>(`lesson/discipline/${code}`);
  return response.data;
};

export const findAllLessons = async (): Promise<Lesson[]> => {
  const response = await api.get<Lesson[]>("lesson/all");
  return response.data;
};

export const saveLesson = async (lesson: Lesson) => {
  const response = await api.post("lesson/save", lesson);
  return response.data;
};

export const updateLesson = async (lesson: Lesson) => {
  const response = await api.put("lesson/update", lesson);
  return response.data;
};

export const deleteLesson = async (id: string) => {
  const response = await api.delete(`lesson/delete/${id}`);
  return response.data;
};

export const findByAttendanceId = async (id: string): Promise<Lesson[]> => {
  const response = await api.get<Lesson[]>(`lesson/attendance/${id}`);
  return response.data;
};

export const findLessonById = async (id: string) => {
  const response = await api.get<Lesson>(`lesson/${id}`);
  return response.data;
};
