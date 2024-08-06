import { Discipline } from "./discipline";
import { GroupCollege } from "./groupCollege";
import { User } from "./user";

export type Teacher = User & {
  teacherCode: string;
  age: number;
  sex: string;
  disciplines: Discipline[];
  groupColleges: GroupCollege[];
};
