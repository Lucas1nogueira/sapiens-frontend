import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";

type Props = {
  schoolClass: SchoolClass;
};

const columns = [
  { key: "name", label: "Nome" },
  { key: "disciplineCode", label: "Código" },
];

export function SchoolClassDisciplines({ schoolClass }: Props) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    api
      .get<Discipline[]>(`discipline/class/${schoolClass.code}`)
      .then((response) => setDisciplines(response.data))
      .catch((error) => console.log(error));
  }, [schoolClass.code]);

  return (
    <>
      <h1>Disciplinas da Turma: {schoolClass.code}</h1>
      <Table
        aria-label="Tabble with all disciplines"
        classNames={{
          base: "max-h-[300px] overflow-auto",
          wrapper: "rounded-none",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={disciplines}>
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
