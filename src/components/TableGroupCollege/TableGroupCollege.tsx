import { AssignDisciplines } from "@components/AssignDisciplines/AssignDisciplines";
import { AssignStudents } from "@components/AssignStudents/AssignStudents";
import { AssignTeachers } from "@components/AssignTeachers/AssignTeachers";
import { CustomModal } from "@components/CustomModal/CustomModal";
import { TableGroupCollegeDisciplines } from "@components/TableGroupCollegeDisciplines/TableGroupCollegeDisciplines";
import { TableGroupCollegeStudents } from "@components/TableGroupCollegeStudents/TableGroupCollegeStudents";
import { TableGroupCollegeTeachers } from "@components/TableGroupCollegeTeachers/TableGroupCollegeTeachers";
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
import { GroupCollege } from "types/groupCollege";
import { ModalType } from "types/modal";

const columns = [
  { key: "groupCode", label: "Código" },
  { key: "students", label: "Alunos" },
  { key: "disciplines", label: "Disciplinas" },
  { key: "teachers", label: "Professores" },
  { key: "addStudents", label: "Adicionar Alunos" },
  { key: "addDiscipline", label: "Adicionar Disciplinas" },
  { key: "addTeachers", label: "Adicionar Professores" },
];

type Props = {
  filterValue: string;
  customModalDisclosure: ModalType;
};

export function TableGroupCollege({
  filterValue,
  customModalDisclosure,
}: Props) {
  const [groupsCollege, setGroupsCollege] = useState<GroupCollege[]>([]);
  const [groupCollege, setGroupCollege] = useState<GroupCollege>(
    {} as GroupCollege
  );

  const showStudentsDisclosure = useDisclosure();
  const showDisciplinesDisclosure = useDisclosure();
  const disciplineDisclosure = useDisclosure();
  const studentsDisclosure = useDisclosure();

  const showTeachersDisclosure = useDisclosure();
  const teachersDisclosure = useDisclosure();

  useEffect(() => {
    api
      .get<GroupCollege[]>("groupCollege/all")
      .then((response) => setGroupsCollege(response.data));
    return () => {};
  }, [
    customModalDisclosure.isOpen,
    studentsDisclosure.isOpen,
    disciplineDisclosure.isOpen,
    teachersDisclosure.isOpen,
  ]);

  const items = useMemo(() => {
    if (!filterValue) {
      return groupsCollege;
    }

    return groupsCollege.filter((groupCollege) => {
      return groupCollege.groupCode
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    });
  }, [groupsCollege, filterValue]);

  const handleShowStudents = (groupCollege: GroupCollege) => {
    showStudentsDisclosure.onOpenChange();
    setGroupCollege(groupCollege);
  };

  const handleShowDisciplines = (groupCollege: GroupCollege) => {
    showDisciplinesDisclosure.onOpenChange();
    setGroupCollege(groupCollege);
  };

  const handleAssignDiscipline = (groupCollege: GroupCollege) => {
    disciplineDisclosure.onOpenChange();
    setGroupCollege(groupCollege);
  };

  const handleAssignStudents = (groupCollege: GroupCollege) => {
    studentsDisclosure.onOpenChange();
    setGroupCollege(groupCollege);
  };

  const handleShowTeachers = (groupCollege: GroupCollege) => {
    showTeachersDisclosure.onOpenChange();
    setGroupCollege(groupCollege);
  };

  const handleAssignTeachers = (groupCollege: GroupCollege) => {
    teachersDisclosure.onOpenChange();
    setGroupCollege(groupCollege);
  };

  return (
    <>
      <Table aria-label="Tabble with all college groups">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(groupCollege) => (
            <TableRow key={groupCollege.groupCode}>
              <TableCell>{groupCollege.groupCode}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleShowStudents(groupCollege)}
                  isIconOnly
                >
                  <Icon icon="ph:student-bold" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleShowDisciplines(groupCollege)}
                  isIconOnly
                >
                  <Icon icon="ic:baseline-class" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleShowTeachers(groupCollege)}
                  isIconOnly
                >
                  <Icon icon="ic:baseline-class" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleAssignStudents(groupCollege)}
                  isIconOnly
                >
                  <Icon icon="material-symbols:add" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleAssignDiscipline(groupCollege)}
                  isIconOnly
                >
                  <Icon icon="material-symbols:add" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleAssignTeachers(groupCollege)}
                  isIconOnly
                >
                  <Icon icon="material-symbols:add" width={22} />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CustomModal
        useDisclosure={showStudentsDisclosure}
        content={<TableGroupCollegeStudents groupCollege={groupCollege} />}
      />

      <CustomModal
        useDisclosure={showDisciplinesDisclosure}
        content={<TableGroupCollegeDisciplines groupCollege={groupCollege} />}
      />

      <CustomModal
        useDisclosure={showTeachersDisclosure}
        content={<TableGroupCollegeTeachers groupCollege={groupCollege} />}
      />

      <CustomModal
        useDisclosure={teachersDisclosure}
        content={<AssignTeachers groupCollege={groupCollege} />}
      />

      <CustomModal
        useDisclosure={studentsDisclosure}
        content={<AssignStudents groupCollege={groupCollege} />}
      />

      <CustomModal
        useDisclosure={disciplineDisclosure}
        content={<AssignDisciplines groupCollege={groupCollege} />}
      />
    </>
  );
}
