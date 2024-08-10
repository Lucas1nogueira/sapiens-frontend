import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Discipline } from "types/discipline";

type Props = {
  discipline: Discipline;
  setDiscipline: (discipline: Discipline | null) => void;
};

export function DisciplineContent({ discipline, setDiscipline }: Props) {
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <Button color="primary" isIconOnly onClick={() => setDiscipline(null)}>
          <Icon icon="ion:chevron-back" />
        </Button>
        <div className="text-right">
          <h1>{discipline.name}</h1>
          <h2>{discipline.teacher.name}</h2>
        </div>
      </CardHeader>
      <CardBody>
        <Divider />
        <Tabs
          aria-label="Options"
          color="primary"
          className="max-w-5xl w-full overflow-x-auto"
          classNames={{
            tabList: "overflow-x-visible",
          }}
        >
          <Tab key="evaluations" title="Atividades">
            <p>Atividades</p>
          </Tab>
          <Tab key="grades" title="Notas">
            <p>Notas</p>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
