import { SuperAdmin } from "types/superAdmin";
import { api } from "./api";

export const saveSuperAdmin = async (superAdmin: SuperAdmin) => {
  const response = await api.post("super-admin/save", superAdmin);
  return response;
};

export const updateSuperAdmin = async (superAdmin: SuperAdmin) => {
  const response = await api.put("super-admin/update", superAdmin);
  return response;
};

export const findAllSuperAdmins = async () => {
  const response = await api.get<SuperAdmin[]>("super-admin/all");
  return response;
};
