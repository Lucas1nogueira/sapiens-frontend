import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { CustomModal } from "@components/Common/CustomModal";
import { CustomTableHeader } from "@components/Common/CustomTableHeader";
import { ChangeEvaluation } from "@components/Evaluation/ChangeEvaluation";
import { Icon } from "@iconify/react/dist/iconify.js";
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
import { useEffect, useMemo, useState } from "react";
import {
  deleteEvaluation,
  findEvaluationsByDisciplineCode,
} from "services/evaluationService";
import { Discipline } from "types/discipline";
import { Evaluation } from "types/evaluation";
import { enqueueNotification } from "utils/enqueueNotification";
import { formatDate, formatDateWithHour } from "utils/formatDate";

type Props = {
  discipline: Discipline;
};

const columns = [
  { key: "name", label: "Nome" },
  { key: "creationDate", label: "Data de Criação" },
  { key: "deliveryDate", label: "Data de Entrega" },
  { key: "edit", label: "Editar" },
  { key: "delete", label: "Excluir" },
];

export function EvaluationsTab({ discipline }: Props) {
  const [content, setContent] = useState<JSX.Element>(<></>);
  const [filterValue, setFilterValue] = useState<string>("");
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const disclosure = useDisclosure();

  useEffect(() => {
    findEvaluationsByDisciplineCode(discipline.code)
      .then((response) => setEvaluations(response.data))
      .catch((error) => console.log(error));
  }, [discipline.code, disclosure.isOpen]);

  const items = useMemo(() => {
    if (!filterValue) return evaluations;

    return evaluations.filter((evaluation) => {
      return (
        evaluation.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        formatDate(evaluation.createdAt).includes(filterValue)
      );
    });
  }, [evaluations, filterValue]);

  const handleCreateEvaluation = () => {
    setContent(<ChangeEvaluation discipline={discipline} />);
    disclosure.onOpenChange();
  };

  const handleEditEvaluation = (evaluation: Evaluation) => {
    setContent(
      <ChangeEvaluation evaluation={evaluation} discipline={discipline} />
    );
    disclosure.onOpenChange();
  };

  const handleDeleteEvaluation = (evaluation: Evaluation) => {
    deleteEvaluation(evaluation.id)
      .then(() => {
        setEvaluations(evaluations.filter((e) => e.id !== evaluation.id));

        enqueueNotification("Avaliação excluída com sucesso!", "success");
      })
      .catch((error) => enqueueNotification(error.response.data, "error"));
  };

  return (
    <>
      <CustomTableHeader
        content={content}
        openModal={handleCreateEvaluation}
        filterValue={filterValue}
        onSearchChange={setFilterValue}
        onClear={() => setFilterValue("")}
        inputPlaceholder="Buscar por nome ou data de criação..."
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
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleEditEvaluation(evaluation)}
                  isIconOnly
                >
                  <Icon icon="material-symbols:edit" width={30} />
                </Button>
              </TableCell>
              <TableCell>
                <ConfirmPopover
                  trigger={
                    <Button color="danger" variant="ghost" isIconOnly>
                      <Icon icon="material-symbols:delete" width={30} />
                    </Button>
                  }
                  title="Tem certeza que deseja excluir a avaliação?"
                  confirmAction={
                    <Button
                      color="danger"
                      onClick={() => handleDeleteEvaluation(evaluation)}
                    >
                      Excluir
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
