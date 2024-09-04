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
import { ModalType } from "types/modal";
import { SchoolClass } from "types/schoolClass";
import { SchoolClassStudents } from "./SchoolClassStudents";
import { SchoolClassDisciplines } from "./SchoolClassDisciplines";
import { SchoolClassTeachers } from "./SchoolClassTeachers";
import { AssignStudents } from "./AssignStudents";
import { AssignDisciplines } from "./AssignDisciplines";
import {
  findAllSchoolClasses,
  findSchoolClassBySchoolId,
} from "services/schoolClassService";
import { useAuth } from "@hooks/useAuth";
import { rolesEnum } from "utils/roles";

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
  const { userSchool, user } = useAuth();
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  useEffect(() => {
    // TODO: MUDAR A FORMA DE BUSCAR DEPOIS PARA TER UMA SELECT POR ESCOLA.
    if (userSchool && user?.role === rolesEnum.ADMIN) {
      findSchoolClassBySchoolId(userSchool.id)
        .then((response) => setSchoolClasses(response.data))
        .catch((error) => console.log(error));
    }

    if (user?.role === rolesEnum.SUPERADMIN) {
      findAllSchoolClasses()
        .then((response) => setSchoolClasses(response.data))
        .catch((error) => console.log(error));
    }
    return () => {};
  }, [customModalDisclosure.isOpen, disclosure.isOpen, userSchool, user]);

  const items = useMemo(() => {
    if (!filterValue) {
      return schoolClasses;
    }

    return schoolClasses.filter((schoolClass) => {
      return schoolClass.code.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [schoolClasses, filterValue]);

  const handleShowStudents = (schoolClass: SchoolClass) => {
    disclosure.onOpenChange();
    setContent(<SchoolClassStudents schoolClass={schoolClass} />);
  };

  const handleShowDisciplines = (schoolClass: SchoolClass) => {
    disclosure.onOpenChange();
    setContent(<SchoolClassDisciplines schoolClass={schoolClass} />);
  };

  const handleAssignDiscipline = (schoolClass: SchoolClass) => {
    disclosure.onOpenChange();
    setContent(<AssignDisciplines schoolClass={schoolClass} />);
  };

  const handleAssignStudents = (schoolClass: SchoolClass) => {
    disclosure.onOpenChange();
    setContent(<AssignStudents schoolClass={schoolClass} />);
  };

  const handleShowTeachers = (schoolClass: SchoolClass) => {
    disclosure.onOpenChange();
    setContent(<SchoolClassTeachers schoolClass={schoolClass} />);
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

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
