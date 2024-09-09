import { Admin } from "types/admin";
import { api } from "./api";
import { User } from "types/user";

export const findAllUsers = async () => {
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

export const saveAdmin = async (admin: Admin) => {
  const response = await api.post("admin/save", admin);
  return response;
};

export const findUsersBySchoolId = async (id: string) => {
  const response = await api.get<User[]>(`admin/users/school/${id}`);
  return response;
};
