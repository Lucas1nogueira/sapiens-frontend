import { Secretariat } from "types/secretariat";
import { api } from "./api";

export const findSecretratBySuperAdminId = async (id: string) => {
  const response = await api.get<Secretariat>(`/secretariat/admin/${id}`);
  return response;
};

export const updateSecretariat = async (secretariat: Secretariat) => {
  const response = await api.put("secretariat/update", secretariat);
  return response;
};
