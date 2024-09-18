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
import { findDisciplineBySchoolClassCode } from "services/disciplineService";
import { SchoolClass } from "types/schoolClass";

type Props = {
  schoolClass: SchoolClass;
};

const columns = [
  { key: "name", label: "Nome" },
  { key: "disciplineCode", label: "Código" },
];

export function SchoolClassDisciplines({ schoolClass }: Props) {
  const { data: disciplinesData, isLoading: disciplinesLoading } = useQuery({
    queryKey: ["disciplines", schoolClass.code],
    queryFn: () => {
      return findDisciplineBySchoolClassCode(schoolClass.code);
    },
  });

  const disciplines = useMemo(() => disciplinesData || [], [disciplinesData]);

  return (
    <>
      <h1>Disciplinas da Turma: {schoolClass.code}</h1>
      <Table
        aria-label="Table with all disciplines"
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
          items={disciplines}
          isLoading={disciplinesLoading}
          loadingContent={<Loading />}
          emptyContent={<EmptyContent />}
        >
          {(discipline) => (
            <TableRow key={discipline.code}>
              <TableCell>{discipline.name}</TableCell>
              <TableCell>{discipline.code}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
