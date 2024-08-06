import { CustomModal } from "@components/CustomModal/CustomModal";
import { TableGroupCollegeDisciplines } from "@components/TableGroupCollegeDisciplines/TableGroupCollegeDisciplines";
import { TableGroupCollegeStudents } from "@components/TableGroupCollegeStudents/TableGroupCollegeStudents";
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
import { GroupCollege } from "types/groupCollege";

const columns = [
  { key: "groupCode", label: "Código" },
  { key: "amoutStudents", label: "Quantidade de Alunos" },
  { key: "students", label: "Alunos" },
  { key: "disciplines", label: "Disciplinas" },
];

export function TableTeacherGroupCollege() {
  const { user } = useAuth();
  const [groupColleges, setGroupColleges] = useState<GroupCollege[]>([]);
  const [groupCollege, setGroupCollege] = useState<GroupCollege>(
    {} as GroupCollege
  );

  const showStudentsDisclosure = useDisclosure();
  const showDisciplinesDisclosure = useDisclosure();

  useEffect(() => {
    api
      .get<GroupCollege[]>(`groupCollege/teacher/${user?.id}`)
      .then((response) => setGroupColleges(response.data));
  }, [user?.id]);

  const handleShowStudents = (groupCollege: GroupCollege) => {
    showStudentsDisclosure.onOpenChange();
    setGroupCollege(groupCollege);
  };

  const handleShowDisciplines = (groupCollege: GroupCollege) => {
    showDisciplinesDisclosure.onOpenChange();
    setGroupCollege(groupCollege);
  };

  if (!groupColleges) return <LoadingPage />;

  return (
    <>
      <Table aria-label="Tabble with all college groups by teacher">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={groupColleges}>
          {(groupCollege) => (
            <TableRow key={groupCollege.groupCode}>
              <TableCell>{groupCollege.groupCode}</TableCell>
              <TableCell>{groupCollege.studentAmount}</TableCell>
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
    </>
  );
}
