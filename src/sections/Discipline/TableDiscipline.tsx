import { CustomModal } from "@components/Common/CustomModal";
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
import { useMemo, useState } from "react";
import { Discipline } from "types/discipline";
import { ModalType } from "types/modal";
import { CreateSchedule } from "./CreateSchedule";
import { DisciplineSchedule } from "./DisciplineSchedule";
import {
  deleteDiscipline,
  findAllDisciplines,
  findAllDisciplinesBySchool,
} from "services/disciplineService";
import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { useAuth } from "@hooks/useAuth";
import { enqueueNotification } from "utils/enqueueNotification";
import { AssignTeacher } from "./AssignTeacher";
import { ChangeDiscipline } from "./ChangeDiscipline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loading } from "@components/Common/Loading";
import { EmptyContent } from "@components/Common/EmptyContent";

const columns = [
  { key: "name", label: "Nome" },
  { key: "disciplineCode", label: "Código" },
  { key: "lessons", label: "Aulas" },
  { key: "professor", label: "Professor" },
  { key: "setProfessor", label: "Atribuir Professor" },
  { key: "schedule", label: "Horário" },
  { key: "addSchedule", label: "Adicionar Horário" },
  { key: "edit", label: "Editar" },
  { key: "delete", label: "Excluir" },
];

type Props = {
  filterValue: string;
  customModalDisclosure: ModalType;
};

export function TableDiscipline({ filterValue }: Props) {
  const { userSchool } = useAuth();
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  const queryFn = useMemo(() => {
    if (!userSchool) return undefined;

    return userSchool.name === "Todas as Escolas"
      ? findAllDisciplines
      : () => findAllDisciplinesBySchool(userSchool?.id as string);
  }, [userSchool]);

  const {
    data: disciplinesData,
    isLoading: disciplinesLoading,
    refetch,
  } = useQuery({
    queryKey: ["tableDisciplines", userSchool?.name],
    queryFn,
  });

  const disciplines = useMemo(() => disciplinesData || [], [disciplinesData]);

  const items = useMemo(() => {
    if (!filterValue) {
      return disciplines;
    }

    return disciplines.filter((discipline) => {
      return discipline.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [disciplines, filterValue]);

  const handleAssign = (discipline: Discipline) => {
    setContent(<AssignTeacher discipline={discipline} />);
    disclosure.onOpenChange();
  };

  const handleAddSchedule = (discipline: Discipline) => {
    setContent(<CreateSchedule discipline={discipline} />);
    disclosure.onOpenChange();
  };

  const handleShowSchedule = (discipline: Discipline) => {
    setContent(<DisciplineSchedule discipline={discipline} />);
    disclosure.onOpenChange();
  };

  const handleEdit = (discipline: Discipline) => {
    setContent(<ChangeDiscipline discipline={discipline} />);
    disclosure.onOpenChange();
  };

  const mutationDelete = useMutation({
    mutationFn: (discipline: string) => deleteDiscipline(discipline),
    onSuccess: async () => {
      enqueueNotification("Disciplina excluída com sucesso!", "success");

      await refetch();
    },
    onError: () => {
      enqueueNotification("Erro ao excluir disciplina.", "error");
    },
  });

  const handleDelete = (discipline: Discipline) =>
    mutationDelete.mutate(discipline.code);

  return (
    <>
      <Table aria-label="Table with all users">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={disciplinesLoading}
          loadingContent={<Loading />}
          emptyContent={<EmptyContent />}
        >
          {(discipline) => (
            <TableRow key={discipline.code}>
              <TableCell>{discipline.name}</TableCell>
              <TableCell>{discipline.code}</TableCell>
              <TableCell>{discipline.manyLessons}</TableCell>
              <TableCell>
                {discipline.teacher?.name ?? "Sem Professor"}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleAssign(discipline)}
                  color="primary"
                  variant="ghost"
                  isIconOnly
                >
                  <Icon icon="streamline:class-lesson-solid" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleShowSchedule(discipline)}
                  color="primary"
                  variant="ghost"
                  isIconOnly
                >
                  <Icon icon="material-symbols:schedule" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleAddSchedule(discipline)}
                  color="primary"
                  variant="ghost"
                  isIconOnly
                >
                  <Icon icon="material-symbols:add" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleEdit(discipline)}
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
                  title="Tem certeza que deseja excluir a disciplina?"
                  confirmAction={
                    <Button
                      color="danger"
                      onClick={() => handleDelete(discipline)}
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
