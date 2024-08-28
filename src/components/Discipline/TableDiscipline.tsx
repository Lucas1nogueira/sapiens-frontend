import { AssignTeacher } from "@components/Discipline/AssignTeacher";
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
import { useEffect, useMemo, useState } from "react";
import { Discipline } from "types/discipline";
import { ModalType } from "types/modal";
import { CreateSchedule } from "./CreateSchedule";
import { DisciplineSchedule } from "./DisciplineSchedule";
import {
  deleteDiscipline,
  findAllDisciplines,
} from "services/disciplineService";
import { EditDiscipline } from "@components/Admin/EditDiscipline";
import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";

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

export function TableDiscipline({ filterValue, customModalDisclosure }: Props) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  useEffect(() => {
    findAllDisciplines()
      .then((response) => setDisciplines(response.data))
      .catch((error) => console.log(error));
    return () => {};
  }, [disclosure.isOpen, customModalDisclosure.isOpen]);

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
    setContent(<EditDiscipline discipline={discipline} />);
    disclosure.onOpenChange();
  };

  const handleDelete = (discipline: Discipline) => {
    deleteDiscipline(discipline.code)
      .then(() => {
        setDisciplines(disciplines.filter((d) => d.code !== discipline.code));

        setSuccess("Disciplina excluída com sucesso!");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <>
      <Table aria-label="Tabble with all users">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
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
