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
  { key: "teacherCode", label: "Código" },
];

export function SchoolClassTeachers({ schoolClass }: Props) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    api
      .get<Discipline[]>(`discipline/class/${schoolClass.code}`)
      .then((response) => setDisciplines(response.data))
      .catch((error) => console.log(error));
  }, [schoolClass.code]);

  return (
    <>
      <h1>Professores da Turma: {schoolClass.code}</h1>
      <Table
        aria-label="Tabble with all teachers"
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
            <TableRow key={discipline.teacher?.code}>
              <TableCell>{discipline.teacher?.name} </TableCell>
              <TableCell>{discipline.teacher?.code}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
