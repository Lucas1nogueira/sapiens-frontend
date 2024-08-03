import { FC, PropsWithChildren, useState } from "react";
import { ErrorContext } from "./ErrorContext";

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
