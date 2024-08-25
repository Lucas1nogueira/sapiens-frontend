import { Attendance } from "types/attendance";
import { api } from "./api";

export const saveAttendance = async (attendance: Attendance) => {
  const response = await api.post("attendance/save-one", attendance);
  return response;
};

export const saveAttendances = async (attendances: Attendance[]) => {
  const response = await api.post("attendance/save-many", attendances);
  return response;
};

export const findAttendancesByLesson = async (lessonId: string) => {
  const response = await api.get<Attendance[]>(`attendance/lesson/${lessonId}`);
  return response;
};
