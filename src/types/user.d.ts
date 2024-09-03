export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  role: UserRole;
  firstLogin: boolean;
};

export type UserRole =
  | "ADMIN"
  | "STUDENT"
  | "TEACHER"
  | "CORDINATOR"
  | "GUARDIAN"
  | "SUPERADMIN";
