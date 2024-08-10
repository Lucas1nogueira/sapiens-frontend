import { FC, PropsWithChildren, useState } from "react";
import { createContext } from "react";

export interface SuccessContextProps {
  successMessage: string;
  setSuccess: (message: string) => void;
  clearSuccess: () => void;
}

export const SuccessContext = createContext<SuccessContextProps | undefined>(
  undefined
);

export const SuccessProvider: FC<PropsWithChildren> = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState<string>("");

  const setSuccess = (message: string) => setSuccessMessage(message);
  const clearSuccess = () => setSuccessMessage("");

  return (
    <SuccessContext.Provider
      value={{ clearSuccess, successMessage, setSuccess }}
    >
      {children}
    </SuccessContext.Provider>
  );
};
