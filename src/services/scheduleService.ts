import { Schedule } from "types/schedule";
import { api } from "./api";

export const saveOneSchedule = async (schedule: Schedule) => {
  const response = await api.post("schedule/save-one", schedule);
  return response.data;
};

export const saveManySchedules = async (schedules: Schedule[]) => {
  const response = await api.post("schedule/save-many", schedules);
  return response.data;
};

export const findAllSchedules = async (): Promise<Schedule[]> => {
  const response = await api.get<Schedule[]>("schedule/all");
  return response.data;
};

export const findScheduleByDisciplineCode = async (
  code: string
): Promise<Schedule[]> => {
  const response = await api.get<Schedule[]>(`schedule/discipline/${code}`);
  return response.data;
};

export const saveSchedulesForDiscipline = async (
  code: string,
  schedules: Schedule[]
) => {
  const response = await api.post(
    `schedule/save-many/discipline/${code}`,
    schedules
  );
  return response.data;
};

export const updateSchedule = async (schedule: Schedule) => {
  const response = await api.put("schedule/update", schedule);
  return response.data;
};

export const deleteSchedule = async (id: string) => {
  const response = await api.delete(`schedule/delete/${id}`);
  return response.data;
};
