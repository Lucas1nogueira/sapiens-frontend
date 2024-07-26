import { ErrorModal } from "@components/ErrorModal/ErrorModal";
import { SuccessModal } from "@components/SuccessModal/SuccessModal";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { api } from "services/api";

export function CreateDiscipline() {
  const [disciplineCode, setDisciplineCode] = useState("");
  const [name, setName] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const disclosure = useDisclosure();
  const successDisclosure = useDisclosure();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const discipline = {
      disciplineCode,
      name,
    };

    api
      .post("discipline/save", discipline)
      .then(() => successDisclosure.onOpenChange())
      .catch((error) => {
        setErrorMessage(error.response.data);
        disclosure.onOpenChange();
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          Criar uma Nova Disciplina
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <Input
            label="Código da Disciplina"
            type="text"
            value={disciplineCode}
            onValueChange={setDisciplineCode}
            placeholder="Insira o código da disciplina"
            errorMessage="Insira um código válido"
            isRequired
          />
          <Input
            label="Nome"
            type="text"
            value={name}
            onValueChange={setName}
            placeholder="Insira seu nome"
            errorMessage="Insira um nome válido"
            isRequired
          />
          <Button type="submit" color="primary" className="w-full rounded-md">
            Criar
          </Button>
        </form>

        <SuccessModal
          useDisclosure={successDisclosure}
          successMessage="Disciplina criada!"
        />
        <ErrorModal useDisclosure={disclosure} errorMessage={erroMessage} />
      </div>
    </div>
  );
}
