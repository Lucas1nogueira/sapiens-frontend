import { useAuth } from "@hooks/useAuth";
import { Button, Card, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { authChangePassword } from "services/authService";
import { enqueueNotification } from "utils/enqueueNotification";

type Inputs = {
  lastPassword: string;
  password: string;
  confirmPassword: string;
};

export function ChangePassword() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<Inputs>({
    defaultValues: {
      lastPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    authChangePassword(user?.email as string, data.lastPassword, data.password)
      .then(() => {
        reset();
        enqueueNotification("Senha alterada com sucesso!", "success");
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
      });
  };

  return (
    <Card shadow="none">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 px-1"
      >
        <Input
          {...register("lastPassword", {
            required: "Senha atual obrigatória",
            minLength: {
              value: 6,
              message: "Senha atual deve conter pelo menos 6 caracteres",
            },
          })}
          onKeyUp={() => trigger("lastPassword")}
          isInvalid={!!errors.lastPassword}
          errorMessage={errors.lastPassword?.message}
          color="primary"
          label="Senha Atual"
          type="password"
          isRequired
        />

        <Input
          {...register("password", {
            required: "Nova senha obrigatória",
            minLength: {
              value: 6,
              message: "Nova senha deve conter pelo menos 6 caracteres",
            },
          })}
          onKeyUp={() => trigger("password")}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          color="primary"
          label="Nova Senha"
          type="password"
          isRequired
        />

        <Input
          {...register("confirmPassword", {
            required: "Confirmar nova senha obrigatória",
            minLength: {
              value: 6,
              message:
                "Confirmar nova senha deve conter pelo menos 6 caracteres",
            },
            validate: (value) => {
              if (value !== getValues("password")) {
                return "As senhas devem ser iguais";
              }
            },
          })}
          onKeyUp={() => trigger("confirmPassword")}
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          color="primary"
          label="Confirmar Nova Senha"
          type="password"
          isRequired
        />

        <Button type="submit" color="primary" className="w-full">
          Alterar Senha
        </Button>
      </form>
    </Card>
  );
}
