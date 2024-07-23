import { createContext } from "react";
import { User } from "types/user";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  handleLogout: () => void;
  handleLogin: (user: User) => void;
  loading: boolean;
}

export const authContext = createContext<AuthContextType | null>(null);
