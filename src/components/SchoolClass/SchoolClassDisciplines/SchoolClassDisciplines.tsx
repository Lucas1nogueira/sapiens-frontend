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
  { key: "disciplineCode", label: "Código" },
];

export function SchoolClassDisciplines({ schoolClass }: Props) {
  return (
    <>
      <h1>Disciplinas da Turma: {schoolClass.code}</h1>
      <Table aria-label="Tabble with all disciplines">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={schoolClass.disciplines}>
          {(discipline) => (
            <TableRow key={discipline.code}>
              <TableCell>{discipline.name}</TableCell>
              <TableCell>{discipline.code}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
