import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { CustomModal } from "@components/Common/CustomModal";
import { CustomTableHeader } from "@components/Common/CustomTableHeader";
import { ChangeEvaluation } from "sections/Evaluation/ChangeEvaluation";
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
import { useMemo, useState } from "react";
import {
  deleteEvaluation,
  findEvaluationsByDisciplineCode,
} from "services/evaluationService";
import { Discipline } from "types/discipline";
import { Evaluation } from "types/evaluation";
import { enqueueNotification } from "utils/enqueueNotification";
import { formatDate, formatDateWithHour } from "utils/formatDate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loading } from "@components/Common/Loading";
import { EmptyContent } from "@components/Common/EmptyContent";

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
  const disclosure = useDisclosure();

  const {
    data: evaluationsData,
    isLoading: evaluationsLoading,
    refetch,
  } = useQuery({
    queryKey: ["tableEvaluations", discipline.code],
    queryFn: () => findEvaluationsByDisciplineCode(discipline.code),
  });

  const evaluations = useMemo(() => evaluationsData || [], [evaluationsData]);

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

  const mutationDelete = useMutation({
    mutationFn: (id: string) => deleteEvaluation(id),
    onSuccess: async () => {
      await refetch();

      enqueueNotification("Avaliação excluída com sucesso!", "success");
    },
    onError: () => {
      enqueueNotification("Erro ao excluir avaliação.", "error");
    },
  });

  const handleDeleteEvaluation = (evaluation: Evaluation) =>
    mutationDelete.mutate(evaluation.id);

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

      <Table aria-label="Table with all evaluations">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={evaluationsLoading}
          loadingContent={<Loading />}
          emptyContent={<EmptyContent />}
        >
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
                      isLoading={mutationDelete.isPending}
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
