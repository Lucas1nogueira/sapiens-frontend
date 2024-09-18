import { useAuth } from "@hooks/useAuth";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { authLogin } from "services/authService";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailPattern } from "utils/validations";
import logo from "@assets/logo.png";
import { enqueueNotification } from "utils/enqueueNotification";

type Inputs = {
  email: string;
  password: string;
};

export function Login() {
  const { handleLogin } = useAuth();
  const disclosure = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    authLogin(data.email, data.password)
      .then((response) => {
        handleLogin(response.data);
        reset();
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
        disclosure.onOpenChange();
      });
  };

  return (
    <div className="max-w-3xl mx-auto w-full h-screen p-4 flex justify-center items-center gap-16">
      <div className="hidden md:block md:w-1/2 text-center">
        <img src={logo} alt="Sapiens Logo." className="drop-shadow-2xl" />
        <h1 className="text-4xl font-bold ">Sapiens Educação</h1>
      </div>
      <div className="w-full md:w-1/2">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Fazer Login</h1>
          <p className="mb-4">Bem-vindo ao Sapiens Educação!</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", {
              required: "Email obrigatório",
              pattern: {
                value: emailPattern,
                message: "Email inválido",
              },
            })}
            label="Email"
            type="email"
            placeholder="Insira seu email"
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            isRequired
          />
          <Input
            {...register("password", {
              required: "Senha obrigatória",
              minLength: {
                value: 6,
                message: "Sua senha deve ter pelo menos 6 caracteres",
              },
            })}
            label="Senha"
            type="password"
            placeholder="Insira sua senha"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
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
