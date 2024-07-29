import { AssignTeacher } from "@components/AssignTeacher/AssignTeacher";
import { CustomModal } from "@components/CustomModal/CustomModal";
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
import { api } from "services/api";
import { Discipline } from "types/discipline";
import { ModalType } from "types/modal";

const columns = [
  { key: "name", label: "Nome" },
  { key: "disciplineCode", label: "Código" },
  { key: "professor", label: "Professor" },
  { key: "setProfessor", label: "Atribuir Professor" },
];

type Props = {
  filterValue: string;
  customModalDisclosure: ModalType;
};

export function TableDiscipline({ filterValue, customModalDisclosure }: Props) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [discipline, setDiscipline] = useState<Discipline>({} as Discipline);
  const assignDisclosure = useDisclosure();

  useEffect(() => {
    api
      .get<Discipline[]>("discipline/all")
      .then((response) => setDisciplines(response.data));
    return () => {};
  }, [assignDisclosure.isOpen, customModalDisclosure.isOpen]);

  const items = useMemo(() => {
    if (!filterValue) {
      return disciplines;
    }

    return disciplines.filter((discipline) => {
      return discipline.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [disciplines, filterValue]);

  const handleAssign = (discipline: Discipline) => {
    setDiscipline(discipline);
    assignDisclosure.onOpenChange();
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
            <TableRow key={discipline.disciplineCode}>
              <TableCell>{discipline.name}</TableCell>
              <TableCell>{discipline.disciplineCode}</TableCell>
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
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CustomModal
        useDisclosure={assignDisclosure}
        content={<AssignTeacher discipline={discipline} />}
      />
    </>
  );
}
