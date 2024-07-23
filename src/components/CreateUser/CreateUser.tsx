import { ErrorModal } from "@components/ErrorModal/ErrorModal";
import { SuccessModal } from "@components/SuccessModal/SuccessModal";
import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { api } from "services/api";

const roles = [
  { key: "ADMIN", label: "Administrador" },
  { key: "TEACHER", label: "Professor" },
  { key: "STUDENT", label: "Aluno" },
  { key: "GUARDIAN", label: "Responsável" },
  { key: "CORDINATOR", label: "Coordenador" },
];

const generatePassword = (): string => {
  return Math.random().toString(36).toLocaleUpperCase().slice(2, 10);
};

const roleToEndpoint: Record<string, string> = {
  TEACHER: "teacher/save",
  STUDENT: "student/save",
  GUARDIAN: "guardian/save",
  CORDINATOR: "cordinator/save",
};

export function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState(generatePassword());
  const [erroMessage, setErrorMessage] = useState("");
  const disclosure = useDisclosure();
  const successDisclosure = useDisclosure();

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
    if (role !== "STUDENT") return;

    if (!password) setPassword(generatePassword());

    const newUser = { name, email, password, role };

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
      <Card className="w-full p-4">
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

          <Button type="submit" color="primary" className="w-full rounded-md">
            Criar
          </Button>
        </form>

        <SuccessModal
          useDisclosure={successDisclosure}
          successMessage="Usuário criado!"
        />
        <ErrorModal useDisclosure={disclosure} errorMessage={erroMessage} />
      </Card>
    </div>
  );
}
