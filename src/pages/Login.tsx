import { useAuth } from "@hooks/useAuth";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/logo.png";
import { isEmailValid, isPasswordValid } from "utils/validations";
import { auth } from "services/authService";
import { useError } from "@hooks/useError";

export function Login() {
  const { handleLogin } = useAuth();
  const { setError } = useError();

  const disclosure = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailIsValid = useMemo(() => {
    if (email === "") return false;
    return !isEmailValid(email);
  }, [email]);

  const passwordIsValid = useMemo(() => {
    if (password === "") return false;
    return !isPasswordValid(password);
  }, [password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    auth
      .login(email, password)
      .then((response) => {
        handleLogin(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
        disclosure.onOpenChange();
      });
  };

  return (
    <div className="max-w-3xl mx-auto w-full h-screen p-4 flex justify-center items-center gap-16">
      <div className="hidden md:block md:w-1/2 text-center">
        <img src={logo} alt="Sapiens Logo." className="drop-shadow-2xl" />
        <h1 className="text-4xl font-bold ">Sapiens Educação</h1>
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
            value={email}
            onValueChange={setEmail}
            errorMessage="Insira um email válido"
            isInvalid={emailIsValid}
            isRequired
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Insira sua senha"
            value={password}
            onValueChange={setPassword}
            errorMessage="Deve conter ao menos 6 dígitos"
            isInvalid={passwordIsValid}
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
    </div>
  );
}
