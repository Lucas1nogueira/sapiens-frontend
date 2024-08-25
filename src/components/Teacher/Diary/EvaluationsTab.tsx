import { CustomModal } from "@components/Common/CustomModal";
import { CustomTableHeader } from "@components/Common/CustomTableHeader";
import { CreateEvaluation } from "@components/Evaluation/CreateEvaluation";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { Discipline } from "types/discipline";
import { Evaluation } from "types/evaluation";
import { formatDate, formatDateWithHour } from "utils/formatDate";

type Props = {
  evaluations: Evaluation[];
  discipline: Discipline;
};

const columns = [
  { key: "name", label: "Nome" },
  { key: "creationDate", label: "Data de Criação" },
  { key: "deliveryDate", label: "Data de Entrega" },
];

export function EvaluationsTab({ evaluations, discipline }: Props) {
  const [content, setContent] = useState<JSX.Element>(<></>);
  const [filterValue, setFilterValue] = useState<string>("");
  const disclosure = useDisclosure();

  const items = useMemo(() => {
    if (!filterValue) return evaluations;

    return evaluations.filter((evaluation) => {
      return (
        evaluation.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        evaluation.createdAt.includes(filterValue)
      );
    });
  }, [evaluations, filterValue]);

  const handleCreateEvaluation = () => {
    setContent(<CreateEvaluation discipline={discipline} />);
    disclosure.onOpenChange();
  };

  return (
    <>
      <CustomTableHeader
        content={content}
        openModal={handleCreateEvaluation}
        filterValue={filterValue}
        onSearchChange={setFilterValue}
        onClear={() => setFilterValue("")}
        inputPlaceholder="Buscar por nome ou data..."
      />

      <Table aria-label="Tabble with all evaluations">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(evaluation) => (
            <TableRow key={evaluation.id}>
              <TableCell>{evaluation.name}</TableCell>
              <TableCell>
                {formatDate(evaluation.createdAt) ?? "Sem Data"}
              </TableCell>
              <TableCell>
                {formatDateWithHour(evaluation.deliveryAt) ?? "Sem Data"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
