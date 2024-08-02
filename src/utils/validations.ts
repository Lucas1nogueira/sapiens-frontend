import { roles } from "./roles";

export const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isNameValid = (name: string) => name.trim().length > 0;

export const isPasswordValid = (password: string) => password.length >= 6;

export const isRolevalid = (role: string) => roles.some((r) => r.key === role);
