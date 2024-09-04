import { useAuth } from "@hooks/useAuth";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";
import { School } from "types/school";
import { SchoolClass } from "types/schoolClass";
import { Teacher } from "types/teacher";

export function CreateDiscipline() {
  const { userSchool } = useAuth();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [manyLessons, setManyLessons] = useState(0);
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const discipline: Discipline = {
      code,
      name,
      manyLessons,
      manyHours: manyLessons * 50,
      teacher: null as unknown as Teacher,
      schoolClass: null as unknown as SchoolClass,
      evaluations: [],
      schedule: [],
      lessons: [],
      school: userSchool ? userSchool : (null as unknown as School),
    };

    api
      .post("discipline/save", discipline)
      .then(() => {
        setCode("");
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
            value={code}
            onValueChange={setCode}
            placeholder="Insira o código da disciplina"
            errorMessage="Insira um código válido"
            isRequired
          />
          <Input
            label="Quantidade de Aulas"
            type="number"
            value={manyLessons.toString()}
            onValueChange={(value) => setManyLessons(Number(value))}
            placeholder="Insira a quantidade de aulas"
            errorMessage="Insira uma quantidade de aulas válida"
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
