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
  { key: "teacherCode", label: "Código" },
];

export function TableGroupCollegeTeachers({ groupCollege }: Props) {
  return (
    <>
      <h1>Professores da Turma: {groupCollege.groupCode}</h1>
      <Table aria-label="Tabble with all teachers">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={groupCollege.teachers}>
          {(teacher) => (
            <TableRow key={teacher.teacherCode}>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.teacherCode}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
