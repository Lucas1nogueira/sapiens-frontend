import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { School } from "types/school";
import { User } from "types/user";
import {
  findSchoolByAdminId,
  findSchoolByStudentsId,
  findSchoolByTeachersId,
} from "services/schoolService";
import { rolesEnum } from "utils/roles";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userSchool: School | null;
  handleLogout: () => void;
  handleLogin: (user: User) => void;
  loading: boolean;
}

const findUserSchoolById = (user: User) => {
  if (user.role === rolesEnum.ADMIN) {
    return findSchoolByAdminId(user.id);
  } else if (user.role === rolesEnum.TEACHER) {
    return findSchoolByTeachersId(user.id);
  } else if (user.role === rolesEnum.STUDENT) {
    return findSchoolByStudentsId(user.id);
  }
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userSchool, setUserSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLogin = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    setUserSchool(null);
    localStorage.removeItem("user");
  };

  const retrieveUser = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  };

  const findUserSchool = useCallback((user: User) => {
    if (!user) return;

    findUserSchoolById(user)
      ?.then((response) => {
        setUserSchool(response.data);
      })
      .catch(() => {
        setUserSchool(null);
      });
  }, []);

  useEffect(() => {
    const user = retrieveUser();

    if (user) {
      findUserSchool(user);
      setUser(user);
      navigate("/");
    }

    setLoading(false);
    return () => {};
  }, [navigate, findUserSchool]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        userSchool,
        loading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
