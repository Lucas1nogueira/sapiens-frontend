import { useAuth } from "@hooks/useAuth";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { findAllAdmins } from "services/adminService";
import { saveSchool, updateSchool } from "services/schoolService";
import { findSecretratBySuperAdminId } from "services/secretariatService";
import { Admin } from "types/admin";
import { School } from "types/school";
import { Secretariat } from "types/secretariat";
import { SuperAdmin } from "types/superAdmin";
import { enqueueNotification } from "utils/enqueueNotification";
import { emailPattern } from "utils/validations";

type Props = {
  school?: School;
};

type Inputs = {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  admin: Admin;
};

export function ChangeSchool({ school }: Props) {
  const { user } = useAuth();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin>(
    school?.admin || ({} as Admin)
  );
  const [secretariat, setSecretariat] = useState<Secretariat>({
    superAdmin: user as SuperAdmin,
  } as Secretariat);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name: school?.name || "",
      address: school?.address || "",
      city: school?.city || "",
      state: school?.state || "",
      zipCode: school?.zipCode || "",
      phone: school?.phone || "",
      email: school?.email || "",
      admin: school?.admin || ({} as Admin),
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (school) {
      const editedSchool: School = {
        ...school,
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        phone: data.phone,
        email: data.email,
        admin: selectedAdmin,
        secretariat,
      };

      updateSchool(editedSchool)
        .then(() => {
          reset();
          enqueueNotification("Escola editada com sucesso!", "success");
        })
        .catch((error) => {
          enqueueNotification(error.response.data, "error");
        });

      return;
    }

    const newSchool: School = {
      id: null as unknown as string,
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      phone: data.phone,
      email: data.email,
      secretariat,
      admin: selectedAdmin,
      students: [],
      teachers: [],
      schoolClasses: [],
      disciplines: [],
    };

    saveSchool(newSchool)
      .then(() => {
        reset();
        enqueueNotification("Escola criada com sucesso!", "success");
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
      });
  };

  useEffect(() => {
    if (user?.id) {
      findSecretratBySuperAdminId(user.id)
        .then((response) => setSecretariat(response.data))
        .catch((error) => console.log(error.response.data));
    }
  }, [user?.id]);

  useEffect(() => {
    findAllAdmins()
      .then((response) => setAdmins(response.data))
      .catch((error) => console.log(error.response.data));
  }, []);

  return (
    <Card shadow="none">
      <CardHeader className="flex justify-center">
        <h1 className="text-2xl font-bold">
          {school ? "Editar" : "Criar"} Escola
        </h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...register("name", { required: "Nome obrigatório" })}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              label="Nome"
              type="text"
              placeholder="Insira o nome da escola"
              isRequired
            />
            <Input
              {...register("address", { required: "Endereço obrigatório" })}
              isInvalid={!!errors.address}
              errorMessage={errors.address?.message}
              label="Endereço"
              type="text"
              placeholder="Insira o endereço da escola"
              isRequired
            />
            <Input
              {...register("city", { required: "Cidade obrigatória" })}
              isInvalid={!!errors.city}
              errorMessage={errors.city?.message}
              label="Cidade"
              type="text"
              placeholder="Insira a cidade"
              isRequired
            />
            <Input
              {...register("state", { required: "Estado obrigatório" })}
              isInvalid={!!errors.state}
              errorMessage={errors.state?.message}
              label="Estado"
              type="text"
              placeholder="Insira o estado"
              isRequired
            />
            <Input
              {...register("zipCode", { required: "CEP obrigatório" })}
              isInvalid={!!errors.zipCode}
              errorMessage={errors.zipCode?.message}
              label="CEP"
              type="text"
              placeholder="Insira o CEP"
              isRequired
            />
            <Input
              {...register("phone", { required: "Telefone obrigatório" })}
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
              label="Telefone"
              type="text"
              placeholder="Insira o telefone"
              isRequired
            />
            <Input
              {...register("email", {
                required: "Email obrigatório",
                pattern: {
                  value: emailPattern,
                  message: "Email inválido",
                },
              })}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              label="Email"
              type="email"
              placeholder="Insira o email"
              isRequired
            />
            <Autocomplete
              {...register("admin", { required: "Administrador obrigatório" })}
              isInvalid={!!errors.admin}
              errorMessage={errors.admin?.message}
              label="Atribua o Administrador"
              variant="bordered"
              defaultItems={admins}
              selectedKey={selectedAdmin?.id?.toString()}
              onSelectionChange={(key) => {
                if (key) {
                  const admin = admins.find((admin) => admin.id == key);
                  setSelectedAdmin(admin || ({} as Admin));
                }
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>

          <Button color="primary" type="submit" fullWidth>
            Salvar Alterações
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
