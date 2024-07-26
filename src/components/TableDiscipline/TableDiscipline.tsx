import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { api } from "services/api";
import { Discipline } from "types/discipline";

const columns = [
  { key: "name", label: "Nome" },
  { key: "disciplineCode", label: "Código" },
];

type Props = {
  filterValue: string;
};

export function TableDiscipline({ filterValue }: Props) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    api
      .get<Discipline[]>("discipline/all")
      .then((response) => setDisciplines(response.data));
    return () => {};
  }, []);

  const items = useMemo(() => {
    if (!filterValue) {
      return disciplines;
    }

    return disciplines.filter((discipline) => {
      return discipline.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [disciplines, filterValue]);

  return (
    <Table aria-label="Tabble with all users">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(discipline) => (
          <TableRow key={discipline.disciplineCode}>
            {(columnKey) => (
              <TableCell>{discipline[columnKey as keyof Discipline]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
