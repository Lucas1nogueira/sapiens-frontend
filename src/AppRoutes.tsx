import { useAuth } from "@hooks/useAuth";
import { ForgotPassword } from "@pages/ForgotPassword";
import { HomeAdmin } from "@pages/HomeAdmin";
import { HomeCordinator } from "@pages/HomeCordinator";
import { HomeGuardian } from "@pages/HomeGuardian";
import { HomeStudent } from "@pages/HomeStudent";
import { HomeSuperAdmin } from "@pages/HomeSuperAdmin";
import { HomeTeacher } from "@pages/HomeTeacher";
import { InitialPasswordChange } from "@pages/InitialPasswordChange";
import { LandingPage } from "@pages/LandingPage";
import { LoadingPage } from "@pages/LoadingPage";
import { Login } from "@pages/Login";
import { NotFound } from "@pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { UserRole } from "types/user";

const homes: Record<UserRole, JSX.Element> = {
  ADMIN: <HomeAdmin />,
  STUDENT: <HomeStudent />,
  TEACHER: <HomeTeacher />,
  CORDINATOR: <HomeCordinator />,
  GUARDIAN: <HomeGuardian />,
  SUPERADMIN: <HomeSuperAdmin />,
};

const routesIfNotAuthenticated = (
  <Route>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
  </Route>
);

export function AppRoutes() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <LoadingPage />;

  if (user?.firstLogin) return <InitialPasswordChange />;

  const homePage = user?.role ? homes[user.role] : <LandingPage />;

  const routesIfAuthenticated = (
    <Route>
      <Route path="/" element={homePage} />
    </Route>
  );

  const route = isAuthenticated
    ? routesIfAuthenticated
    : routesIfNotAuthenticated;

  return (
    <Routes>
      {route}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
