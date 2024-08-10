import { PaginationTable } from "@components/PaginationTable/PaginationTable";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { LoadingPage } from "@pages/LoadingPage";
import { useEffect, useMemo, useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";
import { Teacher } from "types/teacher";

type Props = {
  discipline: Discipline;
};

export function AssignTeacher({ discipline }: Props) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherId, setTeacherId] = useState("");
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const { setError } = useError();
  const { setSuccess } = useSuccess();
  const rowsPerPage = 25;

  const totalPages = useMemo(() => {
    return Math.ceil(teachers.length / rowsPerPage);
  }, [teachers]);

  const items = useMemo(() => {
    if (!teachers) return [];

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;

    if (!filterValue) return teachers.slice(start, end);

    return teachers
      .filter((teacher) => {
        return teacher.name.toLowerCase().includes(filterValue.toLowerCase());
      })
      .slice(start, end);
  }, [teachers, page, filterValue]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!teacherId) return setError("Selecione um professor.");

    const newDiscipline = {
      ...discipline,
      teacher: {
        id: teacherId,
      },
    };

    api
      .put("discipline/update", newDiscipline)
      .then(() => {
        setSuccess("Professor atribuido com sucesso!");
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

  if (!teachers) return <LoadingPage />;

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          Atribua um Professor a uma Disciplina
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <p>
            <strong>Disciplina: {discipline.name} </strong>
          </p>

          <Table
            aria-label="Tabble with all teachers"
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
            color="primary"
            selectionMode="single"
            selectionBehavior="toggle"
            onSelectionChange={(keys) => {
              const [value] = keys;
              const id = value?.toString() || "";
              setTeacherId(id);
            }}
          >
            <TableHeader>
              <TableColumn key="name">Nome</TableColumn>
              <TableColumn key="toggle">Selecionar Linha</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>
                    <Icon icon="ic:round-check-box" width={30} />
                  </TableCell>
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
