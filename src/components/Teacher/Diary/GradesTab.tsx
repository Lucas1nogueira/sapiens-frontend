import { CustomModal } from "@components/Common/CustomModal";
import { CreateGrade } from "@components/Grade/CreateGrade";
import { EditGrade } from "@components/Grade/EditGrade";
import { Icon } from "@iconify/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { findEvaluationsByDisciplineCode } from "services/evaluationService";
import { Discipline } from "types/discipline";
import { Evaluation } from "types/evaluation";
import { Student } from "types/student";
import { formatDate, formatDateWithHour } from "utils/formatDate";

type Props = {
  students: Student[];
  discipline: Discipline;
};

const columns = [
  { key: "name", label: "Nome" },
  { key: "createdAt", label: "Data de Criação" },
  { key: "deliveryAt", label: "Data de Entrega" },
  { key: "addGrade", label: "Lançar Notas" },
  { key: "editGrade", label: "Editar Notas" },
];

export function GradesTab({ students, discipline }: Props) {
  const [content, setContent] = useState<JSX.Element>(<></>);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const disclosure = useDisclosure();

  useEffect(() => {
    findEvaluationsByDisciplineCode(discipline.code)
      .then((response) => setEvaluations(response.data))
      .catch((error) => console.log(error));
  }, [discipline.code]);

  const handleCreateGrade = (evaluation: Evaluation) => {
    setContent(<CreateGrade students={students} evaluation={evaluation} />);
    disclosure.onOpenChange();
  };

  const handleEditGrade = (evaluation: Evaluation) => {
    setContent(<EditGrade evaluation={evaluation} />);
    disclosure.onOpenChange();
  };

  return (
    <>
      <Table aria-label="Tabble with all evaluations">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={evaluations}>
          {(evaluation) => (
            <TableRow key={evaluation.id}>
              <TableCell>{evaluation.name}</TableCell>
              <TableCell>
                {formatDate(evaluation.createdAt) ?? "Sem Data"}
              </TableCell>
              <TableCell>
                {formatDateWithHour(evaluation.deliveryAt) ?? "Sem Data"}
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleCreateGrade(evaluation)}
                  isIconOnly
                >
                  <Icon icon="gridicons:create" width={24} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleEditGrade(evaluation)}
                  isIconOnly
                >
                  <Icon icon="wpf:create-new" width={24} />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CustomModal useDisclosure={disclosure} content={content} size="full" />
    </>
  );
}
