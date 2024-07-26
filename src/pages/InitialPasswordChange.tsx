import { ErrorModal } from "@components/ErrorModal/ErrorModal";
import { useAuth } from "@hooks/useAuth";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { api } from "services/api";

export function InitialPasswordChange() {
  const disclosure = useDisclosure();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const { user, handleLogin } = useAuth();

  const isPasswordInvalid = useMemo(() => {
    if (passwordTouched === false) return false;

    if (password === "") return true;

    return password.trim().length < 8;
  }, [password, passwordTouched]);

  const isConfirmPasswordInvalid = useMemo(() => {
    if (confirmPasswordTouched === false) return false;

    return password !== confirmPassword;
  }, [confirmPassword, password, confirmPasswordTouched]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userPassword = {
      email: user?.email,
      password: password,
      newPassword: confirmPassword,
    };

    api
      .post("auth/change-password", userPassword)
      .then((response) => {
        setErrorMessage("");
        setConfirmPassword("");
        setPassword("");

        handleLogin({ ...user, ...response.data });
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        disclosure.onOpenChange();
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
          onValueChange={(value) => {
            setPasswordTouched(true);
            setPassword(value);
          }}
          isInvalid={isPasswordInvalid}
          label="Nova Senha"
          placeholder="Insira sua nova senha"
          errorMessage="A senha deve ter pelo menos 8 caracteres"
        />
        <Input
          type="password"
          value={confirmPassword}
          onValueChange={(value) => {
            setConfirmPasswordTouched(true);
            setConfirmPassword(value);
          }}
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
      <ErrorModal useDisclosure={disclosure} errorMessage={ErrorMessage} />
    </div>
  );
}
