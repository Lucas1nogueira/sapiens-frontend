import { Attendance } from "types/attendance";
import { api } from "./api";

export const saveOneAttendance = async (attendance: Attendance) => {
  const response = await api.post("attendance/save-one", attendance);
  return response;
};

export const saveManyAttendances = async (attendances: Attendance[]) => {
  const response = await api.post("attendance/save-many", attendances);
  return response;
};

export const findAttendancesByLesson = async (lessonId: string) => {
  const response = await api.get<Attendance[]>(`attendance/lesson/${lessonId}`);
  return response;
};

export const deleteAttendance = async (attendanceId: string) => {
  const response = await api.delete(`attendance/delete/${attendanceId}`);
  return response;
};

export const allAttendances = async () => {
  const response = await api.get<Attendance[]>("attendance/all");
  return response;
};

export const findAttendancesByStudentId = async (studentId: string) => {
  const response = await api.get<Attendance[]>(
    `attendance/student/${studentId}`
  );
  return response;
};
