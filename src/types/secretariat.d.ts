import { School } from "./school";
import { SuperAdmin } from "./superAdmin";

export type Secretariat = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  schools: School[];
  superAdmin: SuperAdmin;
};
