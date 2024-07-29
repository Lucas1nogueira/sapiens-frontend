import { ErrorModal } from "@components/ErrorModal/ErrorModal";
import { SuccessModal } from "@components/SuccessModal/SuccessModal";
import { Button, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";
import { Teacher } from "types/teacher";

type Props = {
  discipline: Discipline;
};

export function AssignTeacher({ discipline }: Props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherId, setTeacherId] = useState("");

  const errorDisclosure = useDisclosure();
  const successDisclosure = useDisclosure();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newDiscipline = {
      ...discipline,
      teacher: {
        id: teacherId,
      },
    };

    api
      .put("discipline/update", newDiscipline)
      .then(() => {
        successDisclosure.onOpenChange();
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        errorDisclosure.onOpenChange();
      });
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherId(e.target.value);
  };

  useEffect(() => {
    if (isFirstLoad) {
      api
        .get<Teacher[]>("teacher/all")
        .then((response) => setTeachers(response.data))
        .catch((error) => {
          setErrorMessage(error.response.data);
          errorDisclosure.onOpenChange();
        })
        .finally(() => setIsFirstLoad(false));
    }
    return () => {};
  }, [errorDisclosure, isFirstLoad]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          Atribua um Professor a uma Disciplina
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <p>
            <strong>Disciplina:</strong> {discipline.name}
          </p>

          <Select
            onChange={handleSelectionChange}
            label="Professor a Atribuir"
            placeholder="Selecione o professor"
          >
            {teachers.map((teacher) => (
              <SelectItem key={teacher.id} textValue={teacher.name}>
                {teacher.name}
              </SelectItem>
            ))}
          </Select>

          <Button type="submit" color="primary" className="w-full rounded-md">
            Atribuir
          </Button>
        </form>

        <SuccessModal
          useDisclosure={successDisclosure}
          successMessage="Professor atribuído com sucesso!"
        />
        <ErrorModal
          useDisclosure={errorDisclosure}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
