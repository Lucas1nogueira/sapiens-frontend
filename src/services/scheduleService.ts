import { Schedule } from "types/schedule";
import { api } from "./api";

export const saveSchedule = async (schedule: Schedule) => {
  const response = await api.post("schedule/save-one", schedule);
  return response;
};

export const saveSchedules = async (schedules: Schedule[]) => {
  const response = await api.post("schedule/save-many", schedules);
  return response;
};

export const findAllSchedules = async () => {
  const response = await api.get<Schedule[]>("schedule/all");
  return response;
};

export const findScheduleByDisciplineCode = async (code: string) => {
  const response = await api.get<Schedule[]>(`schedule/discipline/${code}`);
  return response;
};

export const saveSchedulesForDiscipline = async (
  code: string,
  schedules: Schedule[]
) => {
  const response = await api.post(
    `schedule/save-many/discipline/${code}`,
    schedules
  );
  return response;
};