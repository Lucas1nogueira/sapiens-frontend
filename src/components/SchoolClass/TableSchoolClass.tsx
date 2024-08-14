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
import { api } from "services/api";
import { ModalType } from "types/modal";
import { SchoolClass } from "types/schoolClass";
import { SchoolClassStudents } from "./SchoolClassStudents";
import { SchoolClassDisciplines } from "./SchoolClassDisciplines";
import { SchoolClassTeachers } from "./SchoolClassTeachers";
import { AssignStudents } from "./AssignStudents";
import { AssignDisciplines } from "./AssignDisciplines";

const columns = [
  { key: "code", label: "Código" },
  { key: "students", label: "Alunos" },
  { key: "disciplines", label: "Disciplinas" },
  { key: "teachers", label: "Professores" },
  { key: "addStudents", label: "Adicionar Alunos" },
  { key: "addDiscipline", label: "Adicionar Disciplinas" },
];

type Props = {
  filterValue: string;
  customModalDisclosure: ModalType;
};

export function TableSchoolClass({
  filterValue,
  customModalDisclosure,
}: Props) {
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
  const [schoolClass, setSchoolClass] = useState<SchoolClass>(
    {} as SchoolClass
  );

  const showStudentsDisclosure = useDisclosure();
  const showDisciplinesDisclosure = useDisclosure();
  const showTeachersDisclosure = useDisclosure();

  const disciplineDisclosure = useDisclosure();
  const studentsDisclosure = useDisclosure();

  useEffect(() => {
    api
      .get<SchoolClass[]>("school-class/all")
      .then((response) => setSchoolClasses(response.data));
    return () => {};
  }, [
    customModalDisclosure.isOpen,
    studentsDisclosure.isOpen,
    disciplineDisclosure.isOpen,
  ]);

  const items = useMemo(() => {
    if (!filterValue) {
      return schoolClasses;
    }

    return schoolClasses.filter((schoolClass) => {
      return schoolClass.code.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [schoolClasses, filterValue]);

  const handleShowStudents = (schoolClass: SchoolClass) => {
    showStudentsDisclosure.onOpenChange();
    setSchoolClass(schoolClass);
  };

  const handleShowDisciplines = (schoolClass: SchoolClass) => {
    showDisciplinesDisclosure.onOpenChange();
    setSchoolClass(schoolClass);
  };

  const handleAssignDiscipline = (schoolClass: SchoolClass) => {
    disciplineDisclosure.onOpenChange();
    setSchoolClass(schoolClass);
  };

  const handleAssignStudents = (schoolClass: SchoolClass) => {
    studentsDisclosure.onOpenChange();
    setSchoolClass(schoolClass);
  };

  const handleShowTeachers = (schoolClass: SchoolClass) => {
    showTeachersDisclosure.onOpenChange();
    setSchoolClass(schoolClass);
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
          {(schoolClass) => (
            <TableRow key={schoolClass.code}>
              <TableCell>{schoolClass.code}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleShowStudents(schoolClass)}
                  isIconOnly
                >
                  <Icon icon="ph:student-bold" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleShowDisciplines(schoolClass)}
                  isIconOnly
                >
                  <Icon icon="ic:baseline-class" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleShowTeachers(schoolClass)}
                  isIconOnly
                >
                  <Icon icon="ic:baseline-class" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleAssignStudents(schoolClass)}
                  isIconOnly
                >
                  <Icon icon="material-symbols:add" width={22} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleAssignDiscipline(schoolClass)}
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
        content={<SchoolClassStudents schoolClass={schoolClass} />}
      />

      <CustomModal
        useDisclosure={showDisciplinesDisclosure}
        content={<SchoolClassDisciplines schoolClass={schoolClass} />}
      />

      <CustomModal
        useDisclosure={showTeachersDisclosure}
        content={<SchoolClassTeachers schoolClass={schoolClass} />}
      />

      <CustomModal
        useDisclosure={studentsDisclosure}
        content={<AssignStudents schoolClass={schoolClass} />}
      />

      <CustomModal
        useDisclosure={disciplineDisclosure}
        content={<AssignDisciplines schoolClass={schoolClass} />}
      />
    </>
  );
}
