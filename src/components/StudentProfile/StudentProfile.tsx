import { ErrorModal } from "@components/ErrorModal/ErrorModal";
import { SuccessModal } from "@components/SuccessModal/SuccessModal";
import { useAuth } from "@hooks/useAuth";
import {
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { Student } from "types/student";

const sexTypes = [
  { key: "BLANK", label: "Prefiro não Informar" },
  { key: "MAN", label: "Masculino" },
  { key: "WOMAN", label: "Feminino" },
];

export function StudentProfile() {
  const { user } = useAuth();
  const [student, setStudent] = useState({} as Student);
  const [sex, setSex] = useState(student?.sex ?? "BLANK");
  const [name, setName] = useState(student?.name ?? "");
  const [email, setEmail] = useState(student?.email ?? "");
  const [age, setAge] = useState(student?.age ?? 0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const errorDisclosure = useDisclosure();
  const successDisclosure = useDisclosure();

  useEffect(() => {
    setSex(student?.sex ?? "BLANK");
    setName(student?.name ?? "");
    setEmail(student?.email ?? "");
    setAge(student?.age ?? 0);
  }, [student]);

  useEffect(() => {
    if (user && isFirstLoad) {
      api
        .get<Student>(`student/email/${user.email}`)
        .then((response) => {
          const { id, name, email, age, sex, password } = response.data;
          setStudent({
            ...user,
            id,
            name,
            email,
            age,
            sex,
            password,
          } as Student);
        })
        .catch((error) => {
          setErrorMessage(error.response.data);
          errorDisclosure.onOpenChange();
        })
        .finally(() => {
          setIsFirstLoad(false);
        });
    }
  }, [user, errorDisclosure, isFirstLoad]);

  const handleUpdateData = () => {
    const newStudent = { ...student, name, email, age, sex };

    api
      .put(`student/update`, newStudent)
      .then((response) => {
        const { id, name, email, age, sex, password } = response.data;
        setStudent({
          ...user,
          id,
          name,
          email,
          age,
          sex,
          password,
        } as Student);

        successDisclosure.onOpenChange();
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        errorDisclosure.onOpenChange();
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        color="primary"
        label="Nome"
        value={name}
        onValueChange={setName}
      />
      <Input
        color="primary"
        label="Email"
        value={email}
        onValueChange={setEmail}
      />

      <Select
        color="primary"
        items={sexTypes}
        selectedKeys={[sex]}
        onChange={(e) => setSex(e.target.value)}
        label="Sexo"
        placeholder="Selecione o sexo"
      >
        {(sex) => <SelectItem key={sex.key}>{sex.label}</SelectItem>}
      </Select>

      <Input
        color="primary"
        label="Idade"
        value={String(age)}
        onValueChange={(value) => setAge(Number(value))}
      />
      <Input
        label="Matricula"
        color="warning"
        value={student?.matriculation ?? ""}
        disabled
      />
      <Button color="primary" onClick={handleUpdateData}>
        Atualizar Informações
      </Button>

      <SuccessModal
        useDisclosure={successDisclosure}
        successMessage="Informações Atualizadas com Sucesso"
      />
      <ErrorModal useDisclosure={errorDisclosure} errorMessage={errorMessage} />
    </div>
  );
}
