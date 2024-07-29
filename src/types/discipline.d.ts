import { User } from "./user";

export type Discipline = {
  disciplineCode: string;
  name: string;
  teacher: User;
};
