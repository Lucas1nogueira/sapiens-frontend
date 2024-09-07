import { useAuth } from "@hooks/useAuth";
import { Button, Card, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { authChangePassword } from "services/authService";
import { enqueueNotification } from "utils/enqueueNotification";
import { isPasswordValid } from "utils/validations";

export function ChangePassword() {
  const { user } = useAuth();
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

    authChangePassword(user?.email as string, lastPassword, password)
      .then(() => {
        setLastPassword("");
        setPassword("");
        setConfirmPassword("");

        enqueueNotification("Senha alterada com sucesso!", "success");
      })
      .catch((error) => {
        enqueueNotification(error.response.data.message, "error");
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
