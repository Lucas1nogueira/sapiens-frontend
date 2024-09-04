import { useAuth } from "@hooks/useAuth";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { saveSchoolClass } from "services/schoolClassService";
import { School } from "types/school";
import { SchoolClass } from "types/schoolClass";

export function CreateSchoolClass() {
  const { userSchool } = useAuth();
  const { setError } = useError();
  const { setSuccess } = useSuccess();
  const [code, setCode] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const schoolClass: SchoolClass = {
      code,
      students: [],
      disciplines: [],
      school: userSchool ? userSchool : (null as unknown as School),
    };

    saveSchoolClass(schoolClass)
      .then(() => {
        setSuccess("Turma criada com sucesso!");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">Criar uma Nova Turma</h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <Input
            label="Código da Turma"
            type="text"
            value={code}
            onValueChange={setCode}
            placeholder="Insira o código da Turma"
            errorMessage="Insira um código válido"
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
