import { ErrorModal } from "@components/ErrorModal/ErrorModal";
import { SuccessModal } from "@components/SuccessModal/SuccessModal";
import { AuthProvider } from "@contexts/AuthContext";
import { ErrorProvider } from "@contexts/ErrorContext";
import { SuccessProvider } from "@contexts/SuccessContext";
import { AppRoutes } from "AppRoutes";
import { BrowserRouter } from "react-router-dom";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <SuccessProvider>
        <ErrorProvider>{children}</ErrorProvider>
      </SuccessProvider>
    </AuthProvider>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <Providers>
        <ErrorModal />
        <SuccessModal />
        <AppRoutes />
      </Providers>
    </BrowserRouter>
  );
}
