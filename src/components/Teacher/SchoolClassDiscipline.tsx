import { CreateEvaluation } from "@components/CreateEvaluation/CreateEvaluation";
import { CustomModal } from "@components/Common/CustomModal";
import {
  Avatar,
  Button,
  Divider,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useError } from "@hooks/useError";
import { Student } from "types/student";
import { CreateGrade } from "@components/CreateGrade/CreateGrade";
import { Evaluation } from "types/evaluation";
import { Discipline } from "types/discipline";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { LoadingPage } from "@pages/LoadingPage";

type Props = {
  discipline: Discipline;
  setDiscipline: (discipline: Discipline | null) => void;
};

export function SchoolClassDiscipline({ discipline, setDiscipline }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();
  const { setError } = useError();

  useEffect(() => {
    api
      .get<Student[]>(`school-class/students-discipline/${discipline.code}`)
      .then((response) => setStudents(response.data))
      .catch((error) => setError(error.response.data));
  }, [discipline.code, setError]);

  useEffect(() => {
    api
      .get<Evaluation[]>(`evaluation/discipline/${discipline.code}`)
      .then((response) => setEvaluations(response.data))
      .catch((error) => setError(error.response.data));
  }, [discipline.code, setError, disclosure.isOpen]);

  const handleCreateEvaluation = () => {
    setContent(<CreateEvaluation discipline={discipline} />);

    disclosure.onOpenChange();
  };

  const handleCreateGrade = () => {
    setContent(
      <CreateGrade
        discipline={discipline}
        students={students}
        evaluations={evaluations}
      />
    );

    disclosure.onOpenChange();
  };

  if (!students) return <LoadingPage />;

  return (
    <div key={discipline.code} className="w-full flex flex-col">
      <div className="flex justify-between items-center flex-wrap">
        <Button color="primary" isIconOnly onClick={() => setDiscipline(null)}>
          <Icon icon="ion:chevron-back" />
        </Button>
        <div className="flex gap-2 items-center">
          <div>
            <p className="text-tiny uppercase font-bold text-right">
              {discipline.name}
            </p>
            <p className="text-xs text-right">{discipline.teacher.name}</p>
          </div>
          <Avatar
            isBordered
            radius="sm"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        </div>
        <Divider className="my-2" />
      </div>
      <Tabs aria-label="Options" color="primary" variant="underlined">
        <Tab key="people" title="Pessoas">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Alunos</h1>
            <Divider />
            {students.map((student) => (
              <div key={student.id}>
                <p>{student.name}</p>
                <Divider />
              </div>
            ))}
          </div>
        </Tab>
        <Tab key="evaluations" title="Atividades">
          <Button color="primary" onClick={handleCreateEvaluation}>
            Nova Atividade
          </Button>

          <div className="flex flex-col gap-4 mt-4">
            {evaluations.map((evaluation) => (
              <div key={evaluation.id}>
                <p>{evaluation.name}</p>
                <Divider />
              </div>
            ))}
          </div>
        </Tab>
        <Tab key="notes" title="Notas">
          <Button color="primary" onClick={handleCreateGrade}>
            Lançar Notas
          </Button>
        </Tab>
      </Tabs>

      <CustomModal useDisclosure={disclosure} content={content} size="full" />
    </div>
  );
}
