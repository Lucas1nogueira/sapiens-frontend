import { useAuth } from "@hooks/useAuth";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { authChangePassword } from "services/authService";
import { enqueueNotification } from "utils/enqueueNotification";

type Inputs = {
  password: string;
  confirmPassword: string;
};

export function InitialPasswordChange() {
  const { user, handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<Inputs>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    authChangePassword(
      user?.email as string,
      data.password,
      data.confirmPassword
    )
      .then((response) => {
        reset();

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
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 max-w-sm w-full"
      >
        <Input
          {...register("password", {
            required: "Senha obrigatória",
            minLength: {
              value: 6,
              message: "A senha deve ter pelo menos 6 caracteres",
            },
          })}
          type="password"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          label="Nova Senha"
          placeholder="Insira sua nova senha"
        />
        <Input
          {...register("confirmPassword", {
            required: "Confirme sua nova senha",
            validate: (value) =>
              value === getValues("password") || "As senhas devem ser iguais",
          })}
          type="password"
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          label="Confirmar Senha"
          placeholder="Confirme sua nova senha"
        />

        <Button
          type="submit"
          color="primary"
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!!errors.password || !!errors.confirmPassword}
        >
          Alterar Senha
        </Button>
      </form>
    </div>
  );
}
