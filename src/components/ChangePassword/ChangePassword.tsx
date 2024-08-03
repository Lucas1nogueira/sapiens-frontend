import { useAuth } from "@hooks/useAuth";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Button, Card, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { auth } from "services/authService";
import { isPasswordValid } from "utils/validations";

export function ChangePassword() {
  const { user } = useAuth();
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const [lastPassword, setLastPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordInvalid = useMemo(() => {
    if (password === "") return false;

    return !isPasswordValid(password);
  }, [password]);

  const isLastPasswordInvalid = useMemo(() => {
    if (lastPassword === "") return false;

    return !isPasswordValid(lastPassword);
  }, [lastPassword]);

  const isConfirmPasswordInvalid = useMemo(() => {
    if (confirmPassword === "") return false;

    return password !== confirmPassword;
  }, [confirmPassword, password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    auth
      .changePassword(user?.email as string, lastPassword, password)
      .then(() => {
        setLastPassword("");
        setPassword("");
        setConfirmPassword("");

        setSuccess("Senha alterada com sucesso!");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <Card shadow="none">
      <form onSubmit={handleSubmit}>
        <Input
          color="primary"
          label="Senha Atual"
          type="password"
          value={lastPassword}
          onValueChange={setLastPassword}
          errorMessage="Insira sua senha atual"
          isInvalid={isLastPasswordInvalid}
          isRequired
        />

        <Input
          color="primary"
          label="Nova Senha"
          type="password"
          value={password}
          onValueChange={setPassword}
          errorMessage="Deve conter ao menos 6 dígitos"
          isInvalid={isPasswordInvalid}
          isRequired
        />

        <Input
          color="primary"
          label="Confirmar Nova Senha"
          type="password"
          value={confirmPassword}
          onValueChange={setConfirmPassword}
          errorMessage="As senhas devem ser iguais"
          isInvalid={isConfirmPasswordInvalid}
          isRequired
        />

        <Button type="submit" color="primary" className="w-full">
          Alterar Senha
        </Button>
      </form>
    </Card>
  );
}
