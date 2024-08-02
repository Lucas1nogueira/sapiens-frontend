import { GroupCollege } from "types/groupCollege";
import { api } from "./api";

export const saveGroupCollege = async (groupCollege: GroupCollege) => {
  const response = await api.post("groupCollege/save", groupCollege);
  return response;
};
