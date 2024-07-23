import { FC, PropsWithChildren, useEffect, useState } from "react";
import { authContext } from "./authContext";
import { useNavigate } from "react-router-dom";
import { User } from "types/user";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLogin = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const retrieveUser = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  };

  useEffect(() => {
    const user = retrieveUser();

    if (user) {
      setUser(user);
      navigate("/");
    }

    setLoading(false);
    return () => {};
  }, [navigate]);

  return (
    <authContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
