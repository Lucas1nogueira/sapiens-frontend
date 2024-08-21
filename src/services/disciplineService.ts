import { Discipline } from "types/discipline";
import { api } from "./api";

export const findAllDisciplines = async () => {
  const response = await api.get<Discipline[]>("discipline/all");
  return response;
};
