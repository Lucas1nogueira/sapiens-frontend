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
import { Teacher } from "types/teacher";

const sexTypes = [
  { key: "BLANK", label: "Prefiro não Informar" },
  { key: "MAN", label: "Masculino" },
  { key: "WOMAN", label: "Feminino" },
];

export function TeacherProfile() {
  const { user } = useAuth();
  const [teacher, setTeacher] = useState({} as Teacher);

  const [sex, setSex] = useState(teacher?.sex ?? "BLANK");
  const [name, setName] = useState(teacher?.name ?? "");
  const [email, setEmail] = useState(teacher?.email ?? "");
  const [age, setAge] = useState(teacher?.age ?? 0);
  const [teacherCode, setTeacherCode] = useState(teacher?.teacherCode ?? "");

  const [errorMessage, setErrorMessage] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const errorDisclosure = useDisclosure();
  const successDisclosure = useDisclosure();

  useEffect(() => {
    setSex(teacher?.sex ?? "BLANK");
    setName(teacher?.name ?? "");
    setEmail(teacher?.email ?? "");
    setAge(teacher?.age ?? 0);
    setTeacherCode(teacher?.teacherCode ?? "");
  }, [teacher]);

  useEffect(() => {
    if (user && isFirstLoad) {
      api
        .get<Teacher>(`teacher/email/${user.email}`)
        .then((response) => {
          const { id, name, email, age, sex, password, teacherCode } =
            response.data;

          setTeacher({
            ...user,
            id,
            name,
            email,
            age,
            sex,
            password,
            teacherCode,
          } as Teacher);
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
    const newTeacher = { ...teacher, name, email, age, sex };

    api
      .put("teacher/update", newTeacher)
      .then((response) => {
        const { id, name, email, age, sex, password } = response.data;

        setTeacher({
          ...user,
          id,
          name,
          email,
          age,
          sex,
          password,
        } as Teacher);

        successDisclosure.onOpenChange();
      })
      .catch((error) => {
        console.log(error);

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
      <Input label="Código" color="warning" value={teacherCode} disabled />
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
