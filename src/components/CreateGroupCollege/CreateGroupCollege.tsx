import { ErrorModal } from "@components/ErrorModal/ErrorModal";
import { SuccessModal } from "@components/SuccessModal/SuccessModal";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { saveGroupCollege } from "services/groupCollegeService";

export function CreateGroupCollege() {
  const [erroMessage, setErrorMessage] = useState("");
  const disclosure = useDisclosure();
  const successDisclosure = useDisclosure();

  const [groupCode, setGroupCode] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const groupCollege = {
      groupCode,
      studentAmount: 0,
      students: [],
    };

    saveGroupCollege(groupCollege)
      .then(() => {
        successDisclosure.onOpenChange();
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        disclosure.onOpenChange();
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
            value={groupCode}
            onValueChange={setGroupCode}
            placeholder="Insira o código da Turma"
            errorMessage="Insira um código válido"
            isRequired
          />

          <Button type="submit" color="primary" className="w-full rounded-md">
            Criar
          </Button>
        </form>

        <SuccessModal
          useDisclosure={successDisclosure}
          successMessage="Turma criada!"
        />
        <ErrorModal useDisclosure={disclosure} errorMessage={erroMessage} />
      </div>
    </div>
  );
}
