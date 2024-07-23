import { AuthProvider } from "@contexts/authProvider";
import { AppRoutes } from "AppRoutes";
import { BrowserRouter } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
