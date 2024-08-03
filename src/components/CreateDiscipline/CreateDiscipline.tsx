import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { api } from "services/api";

export function CreateDiscipline() {
  const [disciplineCode, setDisciplineCode] = useState("");
  const [name, setName] = useState("");
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const discipline = {
      disciplineCode,
      name,
    };

    api
      .post("discipline/save", discipline)
      .then(() => {
        setDisciplineCode("");
        setName("");

        setSuccess("Disciplina criada com sucesso!");
      })
      .catch((error) => {
        setError(error.response.data);
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
      </div>
    </div>
  );
}
