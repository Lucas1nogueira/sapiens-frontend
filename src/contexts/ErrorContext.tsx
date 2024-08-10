import { FC, PropsWithChildren, useState } from "react";
import { createContext } from "react";

export interface ErrorContextProps {
  errorMessage: string;
  setError: (message: string) => void;
  clearError: () => void;
}

export const ErrorContext = createContext<ErrorContextProps | undefined>(
  undefined
);

export const ErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const setError = (message: string) => setErrorMessage(message);
  const clearError = () => setErrorMessage("");

  return (
    <ErrorContext.Provider value={{ errorMessage, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};
