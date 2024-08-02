import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { GroupCollege } from "types/groupCollege";

type Props = {
  groupCollege: GroupCollege;
};

const columns = [
  { key: "name", label: "Nome" },
  { key: "matriculation", label: "Matrícula" },
];

export function TableGroupCollegeStudents({ groupCollege }: Props) {
  return (
    <>
      <h1>Alunos da Turma: {groupCollege.groupCode}</h1>
      <Table aria-label="Tabble with all users">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={groupCollege.students}>
          {(student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.matriculation}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
