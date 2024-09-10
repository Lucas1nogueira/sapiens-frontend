import { roleToEndpoint } from "utils/roles";
import { api } from "./api";
import { User } from "types/user";

export const authLogin = async (email: string, password: string) => {
  const response = await api.post("auth/login", { email, password });
  return response;
};

export const authRegister = async <T extends User>(user: T) => {
  const endpoint = roleToEndpoint[user.role];
  const response = await api.post(endpoint, user);
  return response;
};

export const authChangePassword = async (
  email: string,
  password: string,
  newPassword: string
) => {
  const response = await api.post("auth/change-password", {
    email,
    password,
    newPassword,
  });
  return response;
};

export const authUpdateUserRistred = async (user: User) => {
  const response = await api.put("auth/update", user);
  return response;
};
