import { useAuth } from "@hooks/useAuth";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { LoadingPage } from "@pages/LoadingPage";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  findSecretratBySuperAdminId,
  updateSecretariat,
} from "services/secretariatService";
import { Secretariat as SecretariatType } from "types/secretariat";
import { enqueueNotification } from "utils/enqueueNotification";
import { emailPattern } from "utils/validations";

type Inputs = {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
};

export function Secretariat() {
  const { user } = useAuth();
  const [secretariat, setSecretariat] = useState<SecretariatType | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      phone: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user?.id) {
      findSecretratBySuperAdminId(user.id)
        .then((response) => {
          const secretariatData: SecretariatType = response.data;
          setSecretariat(secretariatData);

          const fields = [
            "name",
            "address",
            "city",
            "state",
            "zipCode",
            "email",
            "phone",
          ] as const;

          fields.forEach((field: keyof Inputs) => {
            setValue(field, secretariatData[field]);
          });
        })
        .catch((error) => console.log(error.response.data));
    }
  }, [user?.id, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (secretariat) {
      const editedSecretariat: SecretariatType = {
        ...secretariat,
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        email: data.email,
        phone: data.phone,
      };

      updateSecretariat(editedSecretariat)
        .then(() => {
          enqueueNotification(
            "Secretaria de Educação atualizada com sucesso!",
            "success"
          );
        })
        .catch((error) => enqueueNotification(error.response.data, "error"));
    }
  };

  if (!secretariat) return <LoadingPage />;

  return (
    <Card className="max-w-4xl mx-auto mt-10 p-5 shadow-lg border rounded-lg">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Secretaria de Educação
        </h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register("name", { required: "Este campo é obrigatório" })}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              name="name"
              label="Nome"
              placeholder="Insira o nome da secretaria"
              fullWidth
            />
            <Input
              {...register("address", { required: "Este campo é obrigatório" })}
              isInvalid={!!errors.address}
              errorMessage={errors.address?.message}
              name="address"
              placeholder="Insira o endereço da secretaria"
              label="Endereço"
              fullWidth
            />
            <Input
              {...register("city", { required: "Este campo é obrigatório" })}
              isInvalid={!!errors.city}
              errorMessage={errors.city?.message}
              name="city"
              placeholder="Insira a cidade da secretaria"
              label="Cidade"
              fullWidth
            />
            <Input
              {...register("state", { required: "Este campo é obrigatório" })}
              isInvalid={!!errors.state}
              errorMessage={errors.state?.message}
              name="state"
              placeholder="Insira o estado da secretaria"
              label="Estado"
              fullWidth
            />
            <Input
              {...register("zipCode", { required: "Este campo é obrigatório" })}
              isInvalid={!!errors.zipCode}
              errorMessage={errors.zipCode?.message}
              name="zipCode"
              placeholder="Insira o CEP da secretaria"
              label="CEP"
              fullWidth
            />
            <Input
              {...register("phone", { required: "Este campo é obrigatório" })}
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
              name="phone"
              placeholder="Insira o telefone da secretaria"
              label="Telefone"
              fullWidth
            />
            <Input
              {...register("email", {
                required: "Este campo é obrigatório",
                pattern: {
                  value: emailPattern,
                  message: "Insira um e-mail válido",
                },
              })}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              name="email"
              placeholder="Insira o e-mail da secretaria"
              label="E-mail"
              fullWidth
            />
          </div>
          <Button color="primary" type="submit" className="w-full mt-4">
            Atualizar Dados
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
