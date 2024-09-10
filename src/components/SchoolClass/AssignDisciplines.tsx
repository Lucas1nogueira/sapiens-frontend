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
import { useEffect, useMemo, useState } from "react";
import {
  findAllDisciplinesBySchool,
  findDisciplineBySchoolClassCode,
} from "services/disciplineService";
import { assignDisciplinesToSchoolClass } from "services/schoolClassService";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  schoolClass: SchoolClass;
};

export function AssignDisciplines({ schoolClass }: Props) {
  const [allDisciplines, setAllDisciplines] = useState<Discipline[]>([]);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 25;
  const [selectedKeys, setSelectedKeys] = useState<SelectionType>(new Set());
  const { userSchool } = useAuth();

  const totalPages = useMemo(() => {
    return Math.ceil(allDisciplines.length / rowsPerPage);
  }, [allDisciplines]);

  const items = useMemo(() => {
    if (!allDisciplines) return [];

    const start = (page - 1) * rowsPerPage;
    const end = page * rowsPerPage;

    if (!filterValue) return allDisciplines.slice(start, end);

    return allDisciplines
      .filter((student) => {
        return student.name.toLowerCase().includes(filterValue.toLowerCase());
      })
      .slice(start, end);
  }, [allDisciplines, page, filterValue]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const disciplinesOfClass = allDisciplines.filter((discipline) =>
      selectedKeys instanceof Set ? selectedKeys.has(discipline.code) : false
    );

    const newSchoolClass: SchoolClass = {
      ...schoolClass,
      disciplines: disciplinesOfClass,
    };

    assignDisciplinesToSchoolClass(newSchoolClass)
      .then(() => {
        enqueueNotification("Turma atualizada com sucesso!", "success");
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
      });
  };

  useEffect(() => {
    if (userSchool) {
      findAllDisciplinesBySchool(userSchool.id)
        .then((response) => {
          setAllDisciplines(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [userSchool]);

  useEffect(() => {
    findDisciplineBySchoolClassCode(schoolClass.code)
      .then((response) => {
        const initiallySelected = new Set(
          response.data.map((discipline: Discipline) => discipline.code)
        );

        setSelectedKeys(initiallySelected);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [schoolClass, userSchool, allDisciplines]);

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
            onSelectionChange={(keys) => {
              if (keys != "all") {
                return setSelectedKeys(keys);
              }

              setSelectedKeys(
                new Set(allDisciplines.map((discipline) => discipline.code))
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
              emptyContent={
                schoolClass
                  ? "Nenhuma escola selecionada"
                  : "Nenhum Aluno encontrado"
              }
            >
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
