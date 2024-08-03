import { createContext } from "react";

export interface SuccessContextProps {
  successMessage: string;
  setSuccess: (message: string) => void;
  clearSuccess: () => void;
}

export const SuccessContext = createContext<SuccessContextProps | undefined>(
  undefined
);
