import { PaginationTable } from "@components/PaginationTable/PaginationTable";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Selection as SelectionType,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { api } from "services/api";
import { updateSchoolClass } from "services/schoolClassService";
import { SchoolClass } from "types/schoolClass";
import { Student } from "types/student";

type Props = {
  schoolClass: SchoolClass;
};

export function AssignStudents({ schoolClass }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 25;
  const [selectedKeys, setSelectedKeys] = useState<SelectionType>(new Set([]));

  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const totalPages = useMemo(() => {
    return Math.ceil(students.length / rowsPerPage);
  }, [students]);

  const items = useMemo(() => {
    if (!students) return [];

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;

    if (!filterValue) return students.slice(start, end);

    return students
      .filter((student) => {
        return student.name.toLowerCase().includes(filterValue.toLowerCase());
      })
      .slice(start, end);
  }, [students, page, filterValue]);

  const getSelectedValues = () => {
    if (selectedKeys === "all") return [];
    if (typeof selectedKeys === "object") return Array.from(selectedKeys);
    return [];
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const students: Student[] = [];

    getSelectedValues()?.forEach((key) => {
      students.push({
        id: key as string,
      } as Student);
    });

    const newSchoolClass = {
      ...schoolClass,
      studentAmount: students.length,
      students: students,
    };

    updateSchoolClass(newSchoolClass)
      .then(() => {
        setSuccess("Turma atualizada com sucesso!");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  useEffect(() => {
    api
      .get<Student[]>("student/all")
      .then((response) => {
        const initiallySelected = new Set(
          schoolClass.students.map((student) => student.id.toString())
        );

        setSelectedKeys(initiallySelected);
        setStudents(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, [setError, schoolClass.students]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          Atribua um Alunos a uma Turma
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <p>
            <strong>Turma: {schoolClass.code} </strong>
          </p>

          <Table
            aria-label="Tabble with all students"
            className="min-h-96"
            topContent={
              <Input
                type="text"
                color="default"
                label="Pesquisar Aluno"
                value={filterValue}
                onValueChange={setFilterValue}
              />
            }
            bottomContent={
              <PaginationTable
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            }
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            color="primary"
            selectionMode="multiple"
          >
            <TableHeader>
              <TableColumn key="name">Nome</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Button type="submit" color="primary" className="w-full rounded-md">
            Atribuir
          </Button>
        </form>
      </div>
    </div>
  );
}
