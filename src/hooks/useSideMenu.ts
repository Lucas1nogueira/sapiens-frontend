import { SideMenuContext } from "@contexts/SideMenuContext";
import { useContext } from "react";

export const useSideMenu = () => {
  const context = useContext(SideMenuContext);

  if (!context) {
    throw new Error("useSideMenu must be used within an SideMenuProvider");
  }

  return context;
};
