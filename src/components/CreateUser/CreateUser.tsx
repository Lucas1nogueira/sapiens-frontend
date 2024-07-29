import { ErrorModal } from "@components/ErrorModal/ErrorModal";
import { SuccessModal } from "@components/SuccessModal/SuccessModal";
import {
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { api } from "services/api";
import { generateCode, generatePassword } from "utils/generateValues";
import { roles, rolesEnum, roleToEndpoint } from "utils/roles";

const isStudentOrTeacher = (role: string) => {
  return role === "STUDENT" || role === "TEACHER";
};

type SpecificFields = {
  [key: string]: { [key: string]: string };
};

const getUserCodeFieldIfExists = (role: string, code: string) => {
  const roleSpecificFields: SpecificFields = {
    [rolesEnum.STUDENT]: { matriculation: code },
    [rolesEnum.TEACHER]: { teacherCode: code },
  };

  return roleSpecificFields[role];
};

const getCodeLabel = (role: string) => {
  return role === rolesEnum.STUDENT ? "Matrícula" : "Código do Professor";
};

export function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState(generatePassword());
  const [erroMessage, setErrorMessage] = useState("");
  const disclosure = useDisclosure();
  const successDisclosure = useDisclosure();

  const [code, setCode] = useState(generateCode());

  const isNameInvalid = useMemo(() => {
    if (name === "") return false;
    if (name.trim().length === 0) return true;

    return false;
  }, [name]);

  const isEmailInvalid = useMemo(() => {
    if (email === "") return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  }, [email]);

  const isRoleInvalid = useMemo(() => {
    if (role === "") return false;

    if (!roles.some((r) => r.key === role)) return true;

    return false;
  }, [role]);

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
      ...getUserCodeFieldIfExists(role, code),
    };

    const endpoint = roleToEndpoint[role];

    api
      .post(endpoint, newUser)
      .then((response) => {
        setName("");
        setEmail("");
        setRole("");

        successDisclosure.onOpenChange();
        return response.data;
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        disclosure.onOpenChange();
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
            items={roles}
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

        <SuccessModal
          useDisclosure={successDisclosure}
          successMessage="Usuário criado!"
        />
        <ErrorModal useDisclosure={disclosure} errorMessage={erroMessage} />
      </div>
    </div>
  );
}
