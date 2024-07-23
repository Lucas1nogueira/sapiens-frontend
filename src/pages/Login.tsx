import { User } from "@contexts/authContext";
import { useAuth } from "@hooks/useAuth";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorModal } from "@components/ErrorModal/ErrorModal";
import { api } from "services/api";
import logo from "@assets/logo.png";

export function Login() {
  const { handleLogin } = useAuth();
  const disclosure = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api
      .post<User>("auth/login", { email, password })
      .then((response) => handleLogin(response.data))
      .catch((error) => {
        setErrorMessage(error.response.data);
        disclosure.onOpenChange();
      });
  };

  return (
    <div className="max-w-3xl mx-auto w-full h-screen p-4 flex justify-center items-center gap-10">
      <div className="hidden md:block md:w-1/2">
        <img src={logo} alt="Sapiens Logo." />
      </div>
      <div className="w-1/2">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Fazer Login</h1>
          <p className="mb-4">Bem-vindo ao Sapiens Educação!</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Insira seu email"
            onValueChange={setEmail}
            errorMessage="Insira um email válido"
            isRequired
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Insira sua senha"
            onValueChange={setPassword}
            errorMessage="Deve conter ao menos 6 dígitos"
            isRequired
          />
          <Link
            to="/forgot-password"
            className="text-sm text-right text-blue-500"
          >
            Esqueceu sua senha?
          </Link>
          <Button type="submit" color="primary" className="w-full rounded-md">
            Entrar
          </Button>
        </form>
      </div>
      <ErrorModal useDisclosure={disclosure} errorMessage={errorMessage} />
    </div>
  );
}
