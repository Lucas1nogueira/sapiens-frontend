import { useAuth } from "@hooks/useAuth";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { auth } from "services/authService";
import { User } from "types/user";
import { generateCode, generatePassword } from "utils/generateValues";
import { rolesOfAdmin, rolesOfSuperAdmin, rolesEnum } from "utils/roles";
import { isEmailValid, isNameValid, isRolevalid } from "utils/validations";

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

export function CreateUser() {
  const { user, userSchool } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState(generatePassword());
  const { setError } = useError();
  const { setSuccess } = useSuccess();
  const [code, setCode] = useState(generateCode());

  const isNameInvalid = useMemo(() => {
    if (name === "") return false;
    return !isNameValid(name);
  }, [name]);

  const isEmailInvalid = useMemo(() => {
    if (email === "") return false;
    return !isEmailValid(email);
  }, [email]);

  const isRoleInvalid = useMemo(() => {
    if (role === "") return false;
    if (!isRolevalid(role)) return true;

    return false;
  }, [role]);

  const filterRoles = useMemo(() => {
    if (user?.role === rolesEnum.SUPERADMIN) return rolesOfSuperAdmin;

    return rolesOfAdmin;
  }, [user?.role]);

  const handleCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: add crate to each role
    if (role === "GUARDIAN" || role === "CORDINATOR") return;

    if (!password) setPassword(generatePassword());
    if (!code) setCode(generateCode());

    const newUser = {
      name,
      email,
      password,
      role,
      school: userSchool,
      ...getUserCodeFieldIfExists(role, code),
    };

    auth
      .register(newUser as unknown as User)
      .then(() => {
        setName("");
        setEmail("");
        setRole("");

        setSuccess("Usuário criado com sucesso!");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          Criar um Novo Usuário
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleCreateUser}>
          <Input
            label="Nome"
            type="text"
            value={name}
            onValueChange={setName}
            isInvalid={isNameInvalid}
            placeholder="Insira seu nome"
            errorMessage="Insira um nome válido"
            isRequired
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onValueChange={setEmail}
            isInvalid={isEmailInvalid}
            placeholder="Insira seu email"
            errorMessage="Insira um email válido"
            isRequired
          />
          <Input
            label="Senha"
            type="text"
            value={password}
            placeholder="Insira sua senha"
            errorMessage="Deve conter ao menos 6 dígitos"
            disabled
          />

          <Select
            items={filterRoles}
            selectedKeys={[role]}
            isInvalid={isRoleInvalid}
            onChange={(e) => setRole(e.target.value)}
            label="Tipo de Usuário"
            placeholder="Selecione o tipo de Usuário"
          >
            {(role) => <SelectItem key={role.key}>{role.label}</SelectItem>}
          </Select>

          {isStudentOrTeacher(role) && (
            <Input
              label={getCodeLabel(role)}
              type="text"
              value={code}
              disabled
            />
          )}

          <Button type="submit" color="primary" className="w-full rounded-md">
            Criar
          </Button>
        </form>
      </div>
    </div>
  );
}
