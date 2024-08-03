import { FC, PropsWithChildren, useState } from "react";
import { SuccessContext } from "./SuccessContext";

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
