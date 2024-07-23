import { User } from "./user";

type Student = User & {
  matriculation: string;
  age: number;
  sex: string;
};
