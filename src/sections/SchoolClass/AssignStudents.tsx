import { EmptyContent } from "@components/Common/EmptyContent";
import { Loading } from "@components/Common/Loading";
import { PaginationTable } from "@components/Common/PaginationTable";
import { useAuth } from "@hooks/useAuth";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { assignStudentsToSchoolClass } from "services/schoolClassService";
import {
  findStudentBySchoolClassCode,
  findStudentBySchoolId,
} from "services/studentService";
import { SchoolClass } from "types/schoolClass";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  schoolClass: SchoolClass;
};

export function AssignStudents({ schoolClass }: Props) {
  const { userSchool } = useAuth();
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 25;
  const [selectedKeys, setSelectedKeys] = useState<SelectionType>(new Set());

  const {
    data: studentsData,
    isLoading: studentsLoading,
    error: studentsError,
  } = useQuery({
    queryKey: ["students", userSchool?.id],
    queryFn: () => findStudentBySchoolId(userSchool?.id as string),
  });

  const students = useMemo(() => studentsData || [], [studentsData]);

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

  const mutationAssignStudents = useMutation({
    mutationFn: (newSchoolClass: SchoolClass) => {
      return assignStudentsToSchoolClass(newSchoolClass);
    },
    onSuccess: () => {
      enqueueNotification("Turma atualizada com sucesso!", "success");
    },
    onError: () => {
      enqueueNotification("Erro ao atualizar turma.", "error");
    },
  });

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

    mutationAssignStudents.mutate(newSchoolClass);
  };

  useEffect(() => {
    if (schoolClass) {
      findStudentBySchoolClassCode(schoolClass.code)
        .then((response) => {
          const initiallySelected = new Set(
            response.map((student) => student.id.toString())
          );

          setSelectedKeys(initiallySelected);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [schoolClass]);

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
            aria-label="Table with all students"
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
            onSelectionChange={(keys) => {
              if (keys != "all") {
                return setSelectedKeys(keys);
              }

              setSelectedKeys(
                new Set(students.map((student) => student.id.toString()))
              );
            }}
            color="primary"
            selectionMode="multiple"
            classNames={{
              base: "max-h-[300px] overflow-auto",
              wrapper: "rounded-none",
            }}
          >
            <TableHeader>
              <TableColumn key="name">Nome</TableColumn>
            </TableHeader>
            <TableBody
              items={items}
              isLoading={studentsLoading}
              loadingContent={<Loading />}
              emptyContent={
                schoolClass
                  ? "Nenhuma escola selecionada"
                  : studentsError && <EmptyContent />
              }
            >
              {(student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Button
            type="submit"
            color="primary"
            className="w-full rounded-md"
            isLoading={mutationAssignStudents.isPending}
          >
            Atribuir
          </Button>
        </form>
      </div>
    </div>
  );
}
