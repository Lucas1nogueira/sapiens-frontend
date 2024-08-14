import { useAuth } from "@hooks/useAuth";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
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
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const [student, setStudent] = useState({} as Student);
  const [matriculation, setMatriculation] = useState(
    student?.matriculation ?? ""
  );
  const [sex, setSex] = useState(student?.sex ?? "BLANK");
  const [name, setName] = useState(student?.name ?? "");
  const [email, setEmail] = useState(student?.email ?? "");
  const [age, setAge] = useState(student?.age ?? 0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setSex(student?.sex ?? "BLANK");
    setName(student?.name ?? "");
    setEmail(student?.email ?? "");
    setAge(student?.age ?? 0);
    setMatriculation(student?.matriculation ?? "");
  }, [student]);

  useEffect(() => {
    if (user && isFirstLoad) {
      api
        .get<Student>(`student/email/${user.email}`)
        .then((response) => {
          const { id, name, email, age, sex, password, matriculation } =
            response.data;
          setStudent({
            ...user,
            id,
            name,
            email,
            age,
            sex,
            password,
            matriculation,
          } as Student);
        })
        .catch((error) => {
          setError(error.response.data);
        })
        .finally(() => {
          setIsFirstLoad(false);
        });
    }
  }, [user, isFirstLoad, setError]);

  const handleUpdateData = () => {
    const newStudent = { ...student, name, email, age, sex };

    api
      .put(`student/update`, newStudent)
      .then((response) => {
        const { id, name, email, age, sex, password, matriculation } =
          response.data;
        setStudent({
          ...user,
          id,
          name,
          email,
          age,
          sex,
          password,
          matriculation,
        } as Student);

        setSuccess("Informações atualizadas com sucesso!");
      })
      .catch((error) => {
        setError(error.response.data);
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
      <Input label="Matricula" color="warning" value={matriculation} disabled />
      <Button color="primary" onClick={handleUpdateData}>
        Atualizar Informações
      </Button>
    </div>
  );
}