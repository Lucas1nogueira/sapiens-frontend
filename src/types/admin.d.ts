import { School } from "./school";
import { User } from "./user";

export type Admin = User & {
  school: School;
};
