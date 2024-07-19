import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { NotFound } from "@pages/NotFound";
import { Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
