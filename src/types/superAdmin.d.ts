import { Secretariat } from "./secretariat";
import { User } from "./user";

export type SuperAdmin = User & {
  position: string;
  secretariat: Secretariat;
};
