import { Attendance } from "types/attendance";
import { api } from "./api";

export const saveOneAttendance = async (attendance: Attendance) => {
  const response = await api.post("attendance/save-one", attendance);
  return response.data;
};

export const saveManyAttendances = async (attendances: Attendance[]) => {
  const response = await api.post("attendance/save-many", attendances);
  return response.data;
};

export const deleteAttendance = async (attendanceId: string) => {
  const response = await api.delete(`attendance/delete/${attendanceId}`);
  return response.data;
};

export const findAttendancesByLesson = async (
  lessonId: string
): Promise<Attendance[]> => {
  const response = await api.get<Attendance[]>(`attendance/lesson/${lessonId}`);
  return response.data;
};

export const allAttendances = async (): Promise<Attendance[]> => {
  const response = await api.get<Attendance[]>("attendance/all");
  return response.data;
};

export const findAttendancesByStudentId = async (
  studentId: string
): Promise<Attendance[]> => {
  const response = await api.get<Attendance[]>(
    `attendance/student/${studentId}`
  );
  return response.data;
};
