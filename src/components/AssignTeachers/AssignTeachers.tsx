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
import { Teacher } from "types/teacher";
import { GroupCollege } from "types/groupCollege";

type Props = {
  groupCollege: GroupCollege;
};

export function AssignTeachers({ groupCollege }: Props) {
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

    const teachers: { id: string }[] = [];

    getSelectedValues()?.forEach((key) => {
      teachers.push({
        id: key as string,
      });
    });

    const newGroupCollege = {
      ...groupCollege,
      teachers,
    };

    api
      .put("groupCollege/update", newGroupCollege)
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
        setTeachers(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, [setError]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          Atribua um Professor a uma Turma
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <p>
            <strong>Turma: {groupCollege.groupCode} </strong>
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
