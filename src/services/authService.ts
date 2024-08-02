import { roleToEndpoint } from "utils/roles";
import { api } from "./api";
import { User } from "types/user";

const login = async (email: string, password: string) => {
  const response = await api.post("auth/login", { email, password });
  return response;
};

const register = async <T extends User>(user: T) => {
  const endpoint = roleToEndpoint[user.role];
  const response = await api.post(endpoint, user);
  return response;
};

const changePassword = async (
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

export const auth = {
  login,
  register,
  changePassword,
};
