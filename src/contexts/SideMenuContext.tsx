import { FC, PropsWithChildren, useState } from "react";
import { createContext } from "react";

export interface SideMenuContextProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const SideMenuContext = createContext<SideMenuContextProps | null>(null);

export const SideMenuProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <SideMenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </SideMenuContext.Provider>
  );
};
