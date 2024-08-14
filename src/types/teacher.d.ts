import { Discipline } from "./discipline";
import { User } from "./user";

export type Teacher = User & {
  code: string;
  age: number;
  sex: string;
  disciplines: Discipline[];
};
