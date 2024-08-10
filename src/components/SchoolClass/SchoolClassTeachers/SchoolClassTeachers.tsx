import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { SchoolClass } from "types/schoolClass";

type Props = {
  schoolClass: SchoolClass;
};

const columns = [
  { key: "name", label: "Nome" },
  { key: "teacherCode", label: "Código" },
];

export function SchoolClassTeachers({ schoolClass }: Props) {
  return (
    <>
      <h1>Professores da Turma: {schoolClass.code}</h1>
      <Table aria-label="Tabble with all teachers">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={schoolClass.teachers}>
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
