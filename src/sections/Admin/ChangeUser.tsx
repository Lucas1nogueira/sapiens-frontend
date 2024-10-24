import { useAuth } from "@hooks/useAuth";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { authRegister, authUpdateUserRegistered } from "services/authService";
import { School } from "types/school";
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
  const { user, userSchool } = useAuth();
  const [role, setRole] = useState<UserRole>("ADMIN");

  const queryClient = useQueryClient();

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

  const mutationUpdate = useMutation({
    mutationFn: authUpdateUserRegistered,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tableUsers"] });

      reset();

      enqueueNotification("Usuário atualizado com sucesso!", "success");
    },
    onError: () => {
      enqueueNotification("Erro ao atualizar usuário.", "error");
    },
  });

  const mutationCreate = useMutation({
    mutationFn: (newUser: unknown) => authRegister(newUser as unknown as User),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tableUsers"] });

      reset();

      enqueueNotification("Usuário criado com sucesso!", "success");
    },
    onError: () => {
      enqueueNotification("Erro ao criar usuário.", "error");
    },
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

      mutationUpdate.mutate(updatedUser);

      return;
    }

    const newUser = {
      id: null as unknown as string,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role as UserRole,
      firstLogin: true,
      token: null as unknown as string,
      school: userSchool ? userSchool : (null as unknown as School),
      ...getUserCodeFieldIfExists(role, data.code),
    };

    mutationCreate.mutate(newUser);
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

          <Button
            type="submit"
            color="primary"
            className="w-full rounded-md"
            isLoading={mutationUpdate.isPending || mutationCreate.isPending}
          >
            Salvar Alterações
          </Button>
        </form>
      </div>
    </div>
  );
}
