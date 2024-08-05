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
  { key: "disciplineCode", label: "Código" },
];

export function TableGroupCollegeDisciplines({ groupCollege }: Props) {
  return (
    <>
      <h1>Disciplinas da Turma: {groupCollege.groupCode}</h1>
      <Table aria-label="Tabble with all disciplines">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={groupCollege.disciplines}>
          {(discipline) => (
            <TableRow key={discipline.disciplineCode}>
              <TableCell>{discipline.name}</TableCell>
              <TableCell>{discipline.disciplineCode}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
