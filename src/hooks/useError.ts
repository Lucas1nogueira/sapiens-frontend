import { ErrorContext } from "@contexts/ErrorContext";
import { useContext } from "react";

export const useError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }

  return context;
};
