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
  { key: "matriculation", label: "Matrícula" },
];

export function SchoolClassStudents({ schoolClass }: Props) {
  return (
    <>
      <h1>Alunos da Turma: {schoolClass.code}</h1>
      <Table aria-label="Tabble with all students">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={schoolClass.students}>
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
