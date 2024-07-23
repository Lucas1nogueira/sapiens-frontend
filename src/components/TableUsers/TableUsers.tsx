import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { User } from "types/user";

const columns = [
  { key: "name", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "role", label: "Cargo" },
];

export function TableUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>("admin/all").then((response) => setUsers(response.data));

    return () => {};
  }, []);

  return (
    <Table aria-label="Tabble with all users">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={users}>
        {(user) => (
          <TableRow key={user.name}>
            {(columnKey) => (
              <TableCell>{user[columnKey as keyof User]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
