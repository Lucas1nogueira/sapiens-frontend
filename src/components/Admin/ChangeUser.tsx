import { useAuth } from "@hooks/useAuth";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { authRegister, authUpdateUserRistred } from "services/authService";
import { User, UserRole } from "types/user";
import { enqueueNotification } from "utils/enqueueNotification";
import { generateCode, generatePassword } from "utils/generateValues";
import { rolesOfAdmin, rolesOfSuperAdmin, rolesEnum } from "utils/roles";
import { emailPattern } from "utils/validations";

const isStudentOrTeacher = (role: string) => {
  return role === "STUDENT" || role === "TEACHER";
};

type SpecificFields = {
  [key: string]: { [key: string]: string };
};

const getUserCodeFieldIfExists = (role: string, code: string) => {
  const roleSpecificFields: SpecificFields = {
    [rolesEnum.STUDENT]: { matriculation: code },
    [rolesEnum.TEACHER]: { code: code },
  };

  return roleSpecificFields[role];
};

const getCodeLabel = (role: string) => {
  return role === rolesEnum.STUDENT ? "Matrícula" : "Código do Professor";
};

type Inputs = {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  code: string;
};

type Props = {
  userToEdit?: User;
};

export function ChangeUser({ userToEdit }: Props) {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole>("ADMIN");

  const filterRoles = useMemo(() => {
    if (user?.role === rolesEnum.SUPERADMIN) return rolesOfSuperAdmin;

    return rolesOfAdmin;
  }, [user?.role]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      name: userToEdit?.name ?? "",
      email: userToEdit?.email ?? "",
      role: userToEdit?.role ?? "ADMIN",
      code: generateCode(),
      password: generatePassword(),
    },
    mode: "onChange",
  });

  watch((data, { name }) => {
    if (name === "role") setRole(data.role as UserRole);
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.role === "GUARDIAN" || data.role === "CORDINATOR") return;

    if (userToEdit) {
      const updatedUser: User = {
        ...userToEdit,
        name: data.name,
        role: data.role as UserRole,
        password: data.password,
        ...getUserCodeFieldIfExists(data.role, data.code),
      };

      authUpdateUserRistred(updatedUser)
        .then(() => {
          reset();

          enqueueNotification("Usuário atualizado com sucesso!", "success");
        })
        .catch((error) => {
          enqueueNotification(error.response.data, "error");
        });

      return;
    }

    const newUser: User = {
      id: null as unknown as string,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role as UserRole,
      firstLogin: true,
      token: null as unknown as string,
      ...getUserCodeFieldIfExists(role, data.code),
    };

    authRegister(newUser as unknown as User)
      .then(() => {
        reset();

        enqueueNotification("Usuário criado com sucesso!", "success");
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          {userToEdit ? "Editar" : "Criar"} Usuário
        </h1>
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register("name", { required: "Nome obrigatório" })}
            label="Nome"
            type="text"
            placeholder="Insira seu nome"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            isRequired
          />

          <Input
            {...register("email", {
              required: "Email obrigatório",
              pattern: emailPattern,
            })}
            label="Email"
            type="email"
            placeholder="Insira seu email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            isRequired
          />

          <Input {...register("password")} label="Senha" type="text" disabled />

          <Select
            {...register("role", { required: "Tipo de Usuário obrigatório" })}
            items={filterRoles}
            label="Tipo de Usuário"
            placeholder="Selecione o tipo de Usuário"
          >
            {(role) => <SelectItem key={role.key}>{role.label}</SelectItem>}
          </Select>

          {isStudentOrTeacher(role) && (
            <Input
              {...register("code")}
              label={getCodeLabel(role)}
              type="text"
              disabled
            />
          )}

          <Button type="submit" color="primary" className="w-full rounded-md">
            Salvar Alterações
          </Button>
        </form>
      </div>
    </div>
  );
}
