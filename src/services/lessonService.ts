import { Lesson } from "types/lesson";
import { api } from "./api";

export const findLessonsByDiscipline = async (code: string) => {
  const response = await api.get<Lesson[]>(`lesson/discipline/${code}`);
  return response;
};

export const findAllLessons = async () => {
  const response = await api.get<Lesson[]>("lesson/all");
  return response;
};

export const saveLesson = async (lesson: Lesson) => {
  const response = await api.post("lesson/save", lesson);
  return response;
};

export const updateLesson = async (lesson: Lesson) => {
  const response = await api.put("lesson/update", lesson);
  return response;
};

export const deleteLesson = async (id: string) => {
  const response = await api.delete(`lesson/delete/${id}`);
  return response;
};

export const findByAttendanceId = async (id: string) => {
  const response = await api.get<Lesson>(`lesson/attendance/${id}`);
  return response;
};

export const findLessonById = async (id: string) => {
  const response = await api.get<Lesson>(`lesson/${id}`);
  return response;
};
