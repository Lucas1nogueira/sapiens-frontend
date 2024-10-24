import { EmptyContent } from "@components/Common/EmptyContent";
import { Loading } from "@components/Common/Loading";
import { PaginationTable } from "@components/Common/PaginationTable";
import { Icon } from "@iconify/react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { updateDiscipline } from "services/disciplineService";
import { findTeacherBySchoolId } from "services/teacherService";
import { Discipline } from "types/discipline";
import { Teacher } from "types/teacher";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  discipline: Discipline;
};

export function AssignTeacher({ discipline }: Props) {
  const [teacherId, setTeacherId] = useState(discipline.teacher?.id);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 25;

  const queryClient = useQueryClient();

  const { data: teachersData, isLoading: teachersLoading } = useQuery({
    queryKey: ["teachers", discipline.school.id],
    queryFn: () => findTeacherBySchoolId(discipline.school.id),
  });

  const teachers = useMemo(() => teachersData || [], [teachersData]);

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

  const mutationUpdate = useMutation({
    mutationFn: (editedDiscipline: Discipline) =>
      updateDiscipline(discipline.code, editedDiscipline),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tableDisciplines"] });
      enqueueNotification("Disciplina editada com sucesso!", "success");
    },
    onError: () => {
      enqueueNotification("Erro ao editar disciplina.", "error");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!teacherId)
      return enqueueNotification("Selecione um professor.", "error");

    const newDiscipline: Discipline = {
      ...discipline,
      teacher: {
        id: teacherId,
      } as Teacher,
    };

    mutationUpdate.mutate(newDiscipline);
  };

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
            aria-label="Table with all teachers"
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
            selectedKeys={[teacherId.toString()]}
            onSelectionChange={(keys) => {
              const [value] = keys;
              const id = value?.toString() || "";
              setTeacherId(id);
            }}
            classNames={{
              base: "max-h-[300px] overflow-auto",
              wrapper: "rounded-none",
            }}
          >
            <TableHeader>
              <TableColumn key="name">Nome</TableColumn>
              <TableColumn key="toggle">Selecionar Linha</TableColumn>
            </TableHeader>
            <TableBody
              items={items}
              isLoading={teachersLoading}
              loadingContent={<Loading />}
              emptyContent={<EmptyContent />}
            >
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

          <Button
            type="submit"
            color="primary"
            className="w-full rounded-md"
            isLoading={mutationUpdate.isPending}
          >
            Atribuir
          </Button>
        </form>
      </div>
    </div>
  );
}
