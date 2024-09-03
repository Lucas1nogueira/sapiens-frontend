import { Admin } from "types/admin";
import { api } from "./api";

export const findAll = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await api.get<any[]>("admin/all");
  return response;
};

export const findAllAdmins = async () => {
  const response = await api.get<Admin[]>("admin/admins");
  return response;
};

export const updateAdmin = async (admin: Admin) => {
  const response = await api.put("admin/update", admin);
  return response;
};
