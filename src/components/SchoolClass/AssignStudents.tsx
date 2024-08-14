import { PaginationTable } from "@components/Common/PaginationTable";
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
import { LoadingPage } from "@pages/LoadingPage";
import { useEffect, useMemo, useState } from "react";
import { api } from "services/api";
import { assignStudentsToSchoolClass } from "services/schoolClassService";
import { SchoolClass } from "types/schoolClass";
import { Student } from "types/student";

type Props = {
  schoolClass: SchoolClass;
};

export function AssignStudents({ schoolClass }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [classStudents, setClassStudents] = useState<Student[]>([]);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 25;
  const [selectedKeys, setSelectedKeys] = useState<SelectionType>(new Set());

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const schoolClassStudents = students.filter((student) =>
      selectedKeys instanceof Set
        ? selectedKeys.has(student.id.toString())
        : false
    );

    const newSchoolClass: SchoolClass = {
      ...schoolClass,
      students: schoolClassStudents,
    };

    assignStudentsToSchoolClass(newSchoolClass)
      .then((response) => {
        console.log(response.data);

        setSuccess("Turma atualizada com sucesso!");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  useEffect(() => {
    api
      .get<Student[]>(`student/class/${schoolClass.code}`)
      .then((response) => setClassStudents(response.data))
      .catch((error) => {
        setError(error.response.data);
      });
  }, [schoolClass.code, setError]);

  useEffect(() => {
    api
      .get<Student[]>("student/all")
      .then((response) => {
        const initiallySelected = new Set(
          classStudents.map((student) => student.id.toString())
        );

        setSelectedKeys(initiallySelected);
        setStudents(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, [setError, classStudents]);

  if (!students) return <LoadingPage />;

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
