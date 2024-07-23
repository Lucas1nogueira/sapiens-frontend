import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import logo from "@assets/logo.png";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8 md:flex-row md:gap-0 text-center">
      <div className="max-w-xl w-full">
        <img
          src={logo}
          alt="Sapiens logo."
          className="max-w-xs w-full mx-auto"
        />
        <h1 className="text-3xl font-bold">Sapiens Educação</h1>
      </div>
      <div className="max-w-xl w-full">
        <p>Bem-vindo ao Sapiens Educação!</p>
        <p>
          O Sapiens Educação é um sistema projetado para automatizar e otimizar
          processos administrativos e acadêmicos em instituições educacionais.
        </p>
        <Button
          color="secondary"
          variant="ghost"
          className="max-w-xs w-full rounded-md mt-4 font-medium text-md"
          onClick={() => navigate("/login")}
        >
          Fazer Login
        </Button>
      </div>
    </div>
  );
};
