export type User = {
  name: string;
  email: string;
  token: string;
  role: UserRole;
};

export type UserRole =
  | "ADMIN"
  | "STUDENT"
  | "TEACHER"
  | "CORDINATOR"
  | "GUARDIAN";
