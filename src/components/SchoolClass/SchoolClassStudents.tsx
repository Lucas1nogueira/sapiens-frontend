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
import { SchoolClass } from "types/schoolClass";
import { Student } from "types/student";

type Props = {
  schoolClass: SchoolClass;
};

const columns = [
  { key: "name", label: "Nome" },
  { key: "matriculation", label: "Matrícula" },
];

export function SchoolClassStudents({ schoolClass }: Props) {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    api
      .get<Student[]>(`student/class/${schoolClass.code}`)
      .then((response) => setStudents(response.data))
      .catch((error) => console.log(error));
  }, [schoolClass.code]);

  return (
    <>
      <h1>Alunos da Turma: {schoolClass.code}</h1>
      <Table
        aria-label="Tabble with all students"
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
        <TableBody items={students}>
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
