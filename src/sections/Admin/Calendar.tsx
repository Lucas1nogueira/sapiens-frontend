import { useAuth } from "@hooks/useAuth";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  SharedSelection,
} from "@nextui-org/react";
import { useState } from "react";
import { DisciplinesSchedule } from "sections/Discipline/DisciplinesSchedule";
import {
  findAllDisciplines,
  findAllDisciplinesBySchool,
} from "services/disciplineService";
import { Discipline } from "types/discipline";
import { rolesEnum } from "utils/roles";

type Option = {
  key: string;
  label: string;
};

const calendarOptions: Option[] = [
  {
    key: "disciplines",
    label: "Disciplinas",
  },
];

export function Calendar() {
  const { user, userSchool } = useAuth();
  const [content, setContent] = useState<JSX.Element>(<></>);
  const [value, setValue] = useState<SharedSelection>(new Set([]));
  const [disciplines, setDisciplines] = useState<Discipline[] | null>(null);

  const onSelectionChange = (value: SharedSelection) => {
    setValue(value);

    const actionMap: Record<string, () => void> = {
      disciplines: () => {
        if (disciplines) {
          return setContent(<DisciplinesSchedule disciplines={disciplines} />);
        }

        if (user?.role === rolesEnum.SUPERADMIN) {
          findAllDisciplines()
            .then((response) => {
              setDisciplines(response);
              setContent(<DisciplinesSchedule disciplines={response} />);
            })
            .catch((error) => console.log(error.response));
        }

        if (user?.role === rolesEnum.ADMIN) {
          findAllDisciplinesBySchool(userSchool?.id as string)
            .then((response) => {
              setDisciplines(response);
              setContent(<DisciplinesSchedule disciplines={response} />);
            })
            .catch((error) => console.log(error.response.data));
        }
      },
      events: () => {
        setContent(<></>);
      },
    };

    const action =
      actionMap[value.currentKey ? value.currentKey : "disciplines"];

    if (action) action();
  };

  return (
    <Card shadow="none">
      <CardHeader className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendário</h1>
        <Select
          label="Opções de Calendário"
          selectedKeys={value}
          variant="bordered"
          color="primary"
          className="max-w-96"
          onSelectionChange={onSelectionChange}
        >
          {calendarOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      </CardHeader>
      <CardBody>{content}</CardBody>
    </Card>
  );
}
