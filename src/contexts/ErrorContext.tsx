import { createContext } from "react";

export interface ErrorContextProps {
  errorMessage: string;
  setError: (message: string) => void;
  clearError: () => void;
}

export const ErrorContext = createContext<ErrorContextProps | undefined>(
  undefined
);
