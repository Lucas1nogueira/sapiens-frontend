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
import { User } from "types/user";

const columns = [
  { key: "name", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "role", label: "Cargo" },
];

type Props = {
  filterValue: string;
};

export function TableUsers({ filterValue }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>("admin/all").then((response) => setUsers(response.data));

    return () => {};
  }, []);

  const items = useMemo(() => {
    if (!filterValue) {
      return users;
    }

    return users.filter((user) => {
      return user.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [users, filterValue]);

  return (
    <Table aria-label="Tabble with all users">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(user) => (
          <TableRow key={user.id}>
            {(columnKey) => (
              <TableCell>{user[columnKey as keyof User]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
