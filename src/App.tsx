import { AuthProvider } from "@contexts/AuthContext";
import { NotificationProvider } from "@contexts/NotificationContext";
import { SideMenuProvider } from "@contexts/SideMenuContext";
import { useNotification } from "@hooks/useNotification";
import { AppRoutes } from "AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { setNotify } from "utils/enqueueNotification";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { enqueueNotification } = useNotification();
  setNotify(enqueueNotification);

  return (
    <AuthProvider>
      <SideMenuProvider>{children}</SideMenuProvider>
    </AuthProvider>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <Providers>
          <AppRoutes />
        </Providers>
      </NotificationProvider>
    </BrowserRouter>
  );
}
