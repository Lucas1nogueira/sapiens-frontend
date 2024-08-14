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
import { useEffect, useMemo, useState } from "react";
import { api } from "services/api";
import { assignDisciplinesToSchoolClass } from "services/schoolClassService";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";

type Props = {
  schoolClass: SchoolClass;
};

export function AssignDisciplines({ schoolClass }: Props) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [classDisciplines, setClassDisciplines] = useState<Discipline[]>([]);

  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 25;
  const [selectedKeys, setSelectedKeys] = useState<SelectionType>(new Set());
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  const totalPages = useMemo(() => {
    return Math.ceil(disciplines.length / rowsPerPage);
  }, [disciplines]);

  const items = useMemo(() => {
    if (!disciplines) return [];

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;

    if (!filterValue) return disciplines.slice(start, end);

    return disciplines
      .filter((student) => {
        return student.name.toLowerCase().includes(filterValue.toLowerCase());
      })
      .slice(start, end);
  }, [disciplines, page, filterValue]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const disciplinesOfClass = disciplines.filter((discipline) =>
      selectedKeys instanceof Set ? selectedKeys.has(discipline.code) : false
    );

    const newSchoolClass: SchoolClass = {
      ...schoolClass,
      disciplines: disciplinesOfClass,
    };

    assignDisciplinesToSchoolClass(newSchoolClass)
      .then(() => {
        setSuccess("Turma atualizada com sucesso!");
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  useEffect(() => {
    api
      .get<Discipline[]>(`discipline/class/${schoolClass.code}`)
      .then((response) => setClassDisciplines(response.data))
      .catch((error) => {
        setError(error.response.data);
      });
  }, [setError, schoolClass.code]);

  useEffect(() => {
    api
      .get<Discipline[]>("discipline/all")
      .then((response) => {
        const initiallySelected = new Set(
          classDisciplines.map((discipline: Discipline) => discipline.code)
        );

        setSelectedKeys(initiallySelected);
        setDisciplines(response.data);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  }, [setError, classDisciplines]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          Atribua um Disciplinas a uma Turma
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
                label="Pesquisar Disciplina"
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
              {(discipline) => (
                <TableRow key={discipline.code}>
                  <TableCell>{discipline.name}</TableCell>
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
