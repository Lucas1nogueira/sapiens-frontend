import { Admin } from "./admin";
import { Discipline } from "./discipline";
import { SchoolClass } from "./schoolClass";
import { Secretariat } from "./secretariat";
import { Student } from "./student";
import { Teacher } from "./teacher";

export type School = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  secretariat: Secretariat;
  admin: Admin;
  students: Student[];
  teachers: Teacher[];
  schoolClasses: SchoolClass[];
  disciplines: Discipline[];
};
