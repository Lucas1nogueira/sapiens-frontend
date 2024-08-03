import { SuccessContext } from "@contexts/SuccessContext";
import { useContext } from "react";

export const useSuccess = () => {
  const context = useContext(SuccessContext);

  if (!context) {
    throw new Error("useSuccess must be used within an SuccessProvider");
  }

  return context;
};
