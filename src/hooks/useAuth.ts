import { authContext } from "@contexts/authContext";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
