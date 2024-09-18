import { EmptyContent } from "@components/Common/EmptyContent";
import { Loading } from "@components/Common/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { findStudentBySchoolClassCode } from "services/studentService";
import { SchoolClass } from "types/schoolClass";

type Props = {
  schoolClass: SchoolClass;
};

const columns = [
  { key: "name", label: "Nome" },
  { key: "matriculation", label: "Matrícula" },
];

export function SchoolClassStudents({ schoolClass }: Props) {
  const { data: studentsData, isLoading: studentsLoading } = useQuery({
    queryKey: ["students", schoolClass.code],
    queryFn: () => findStudentBySchoolClassCode(schoolClass.code),
  });

  const students = useMemo(() => studentsData || [], [studentsData]);

  return (
    <>
      <h1>Alunos da Turma: {schoolClass.code}</h1>
      <Table
        aria-label="Table with all students"
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
        <TableBody
          items={students}
          isLoading={studentsLoading}
          loadingContent={<Loading />}
          emptyContent={<EmptyContent />}
        >
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
