import { useAuth } from "@hooks/useAuth";
import { Button, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { authChangePassword } from "services/authService";
import { enqueueNotification } from "utils/enqueueNotification";
import { isPasswordValid } from "utils/validations";

export function InitialPasswordChange() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, handleLogin } = useAuth();

  const isPasswordInvalid = useMemo(() => {
    if (password === "") return false;

    return !isPasswordValid(password);
  }, [password]);

  const isConfirmPasswordInvalid = useMemo(() => {
    if (confirmPassword === "" && password === "") return false;

    return password !== confirmPassword;
  }, [confirmPassword, password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authChangePassword(user?.email as string, password, confirmPassword)
      .then((response) => {
        setConfirmPassword("");
        setPassword("");

        handleLogin({ ...user, ...response.data });
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-center mb-10 font-semibold">
        <h1 className="text-3xl">Bem-vindo(a) ao Sapiens Educação</h1>
        <p className="text-xl">Insira sua nova senha e confirme-a</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 max-w-sm w-full"
      >
        <Input
          type="password"
          value={password}
          onValueChange={setPassword}
          isInvalid={isPasswordInvalid}
          label="Nova Senha"
          placeholder="Insira sua nova senha"
          errorMessage="A senha deve ter pelo menos 6 caracteres"
        />
        <Input
          type="password"
          value={confirmPassword}
          onValueChange={setConfirmPassword}
          isInvalid={isConfirmPasswordInvalid}
          label="Confirmar Senha"
          placeholder="Confirme sua nova senha"
          errorMessage="As senhas devem ser iguais"
        />

        <Button
          type="submit"
          color="primary"
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPasswordInvalid || isConfirmPasswordInvalid}
        >
          Alterar Senha
        </Button>
      </form>
    </div>
  );
}
