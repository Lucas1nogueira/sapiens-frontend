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
import { Teacher } from "types/teacher";

type Props = {
  schoolClass: SchoolClass;
};

export function AssignTeachers({ schoolClass }: Props) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 25;
  const [selectedKeys, setSelectedKeys] = useState<SelectionType>(new Set([]));
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const totalPages = useMemo(() => {
    return Math.ceil(teachers.length / rowsPerPage);
  }, [teachers]);

  const items = useMemo(() => {
    if (!teachers) return [];

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;

    if (!filterValue) return teachers.slice(start, end);

    return teachers
      .filter((student) => {
        return student.name.toLowerCase().includes(filterValue.toLowerCase());
      })
      .slice(start, end);
  }, [teachers, page, filterValue]);

  const getSelectedValues = () => {
    if (selectedKeys === "all") return [];
    if (typeof selectedKeys === "object") return Array.from(selectedKeys);
    return [];
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const teachers: Teacher[] = [];

    getSelectedValues()?.forEach((key) => {
      teachers.push({
        id: key as string,
      } as Teacher);
    });

    const newSchoolClass = {
      ...schoolClass,
      teachers,
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
      .get<Teacher[]>("teacher/all")
      .then((response) => {
        const initiallySelected = new Set(
          schoolClass.teachers.map((teacher) => teacher.id.toString())
        );

        setTeachers(response.data);
        setSelectedKeys(initiallySelected);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, [setError, schoolClass.teachers]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          Atribua um Professor a uma Turma
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <p>
            <strong>Turma: {schoolClass.code} </strong>
          </p>

          <Table
            aria-label="Tabble with all disciplines"
            className="min-h-96"
            topContent={
              <Input
                type="text"
                color="default"
                label="Pesquisar Professor"
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
              {(teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
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
