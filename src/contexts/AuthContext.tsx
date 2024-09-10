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
import { isTokenExpired } from "utils/verifyToken";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  userSchool: School | null;
  handleLogout: () => void;
  handleLogin: (user: User) => void;
  setUserSchool: (school: School) => void;
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

  const handleLogout = useCallback(() => {
    setUser(null);
    setUserSchool(null);
    localStorage.removeItem("user");
  }, []);

  const retrieveUser = useCallback(() => {
    const user = localStorage.getItem("user");

    if (!user) return null;

    const userParsed = JSON.parse(user);

    return userParsed;
  }, []);

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

    if (!user) {
      setUser(null);
      setUserSchool(null);
      return setLoading(false);
    }

    const isTokenInvalid = isTokenExpired(user);

    if (isTokenInvalid) return handleLogout();

    findUserSchool(user);
    setUser(user);
    navigate("/");
    setLoading(false);
  }, [navigate, findUserSchool, retrieveUser, handleLogout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        userSchool,
        loading,
        handleLogin,
        handleLogout,
        setUserSchool,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
