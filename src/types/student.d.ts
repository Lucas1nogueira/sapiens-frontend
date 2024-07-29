import { User } from "./user";

export type Student = User & {
  matriculation: string;
  age: number;
  sex: string;
};
