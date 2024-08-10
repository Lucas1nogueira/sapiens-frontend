import { CustomModal } from "@components/CustomModal/CustomModal";
import { SchoolClassDisciplines } from "@components/SchoolClass/SchoolClassDisciplines/SchoolClassDisciplines";
import { SchoolClassStudents } from "@components/SchoolClass/SchoolClassStudents/SchoolClassStudents";
import { useAuth } from "@hooks/useAuth";
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
import { LoadingPage } from "@pages/LoadingPage";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { SchoolClass } from "types/schoolClass";

const columns = [
  { key: "code", label: "Código" },
  { key: "students", label: "Alunos" },
  { key: "disciplines", label: "Disciplinas" },
];

export function TeacherSchoolClass() {
  const { user } = useAuth();
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
  const [schoolClass, setSchoolClass] = useState<SchoolClass>(
    {} as SchoolClass
  );

  const showStudentsDisclosure = useDisclosure();
  const showDisciplinesDisclosure = useDisclosure();

  useEffect(() => {
    api
      .get<SchoolClass[]>(`school-class/teacher/${user?.id}`)
      .then((response) => setSchoolClasses(response.data));
  }, [user?.id]);

  const handleShowStudents = (schoolClass: SchoolClass) => {
    showStudentsDisclosure.onOpenChange();
    setSchoolClass(schoolClass);
  };

  const handleShowDisciplines = (schoolClass: SchoolClass) => {
    showDisciplinesDisclosure.onOpenChange();
    setSchoolClass(schoolClass);
  };

  if (!schoolClasses) return <LoadingPage />;

  return (
    <>
      <Table aria-label="Tabble with all college groups by teacher">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={schoolClasses}>
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
    </>
  );
}
