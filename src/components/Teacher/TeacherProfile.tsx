import { useAuth } from "@hooks/useAuth";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { Teacher } from "types/teacher";
import { enqueueNotification } from "utils/enqueueNotification";

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
  const [code, setCode] = useState(teacher?.code ?? "");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setSex(teacher?.sex ?? "BLANK");
    setName(teacher?.name ?? "");
    setEmail(teacher?.email ?? "");
    setAge(teacher?.age ?? 0);
    setCode(teacher?.code ?? "");
  }, [teacher]);

  useEffect(() => {
    if (user && isFirstLoad) {
      api
        .get<Teacher>(`teacher/email/${user.email}`)
        .then((response) => {
          const { id, name, email, age, sex, password, code } = response.data;

          setTeacher({
            ...user,
            id,
            name,
            email,
            age,
            sex,
            password,
            code,
          } as Teacher);
        })
        .catch((error) => {
          enqueueNotification(error.response.data, "error");
        })
        .finally(() => {
          setIsFirstLoad(false);
        });
    }
  }, [user, isFirstLoad]);

  const handleUpdateData = () => {
    const newTeacher = { ...teacher, name, email, age, sex };

    api
      .put("teacher/update", newTeacher)
      .then((response) => {
        const { id, name, email, age, sex, password, code } = response.data;

        setTeacher({
          ...user,
          id,
          name,
          email,
          age,
          sex,
          password,
          code,
        } as Teacher);

        enqueueNotification("Informações atualizadas com sucesso!", "success");
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
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
      <Input label="Código" color="warning" value={code} disabled />
      <Button color="primary" onClick={handleUpdateData}>
        Atualizar Informações
      </Button>
    </div>
  );
}
