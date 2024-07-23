import { ErrorModal } from "@components/ErrorModal/ErrorModal";
import {
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
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
  const [erroMessage, setErrorMessage] = useState("");
  const password = generatePassword();
  const disclosure = useDisclosure();

  const handleCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = { name, email, password, role };

    const endpoint = roleToEndpoint[role];

    api
      .post(endpoint, newUser)
      .then((response) => {
        setName("");
        setEmail("");
        setRole("");
        return response.data;
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        disclosure.onOpenChange();
      });
  };

  return (
    <div className="flex justify-center items-center w-screen p-10">
      <div className="w-1/2">
        <h1 className="text-center text-2xl font-bold">
          Criar um Novo Usuário
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleCreateUser}>
          <Input
            label="Nome"
            type="text"
            value={name}
            onValueChange={setName}
            placeholder="Insira seu nome"
            errorMessage="Insira um nome válido"
            isRequired
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onValueChange={setEmail}
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

        <ErrorModal useDisclosure={disclosure} errorMessage={erroMessage} />
      </div>
    </div>
  );
}
