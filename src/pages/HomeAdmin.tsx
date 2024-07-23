import { CreateUser } from "@components/CreateUser/CreateUser";
import { Header } from "@components/Header/Header";
import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { User } from "types/user";

const columns = [
  { key: "name", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "role", label: "Cargo" },
];

export function HomeAdmin() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>("admin/all").then((response) => setUsers(response.data));

    return () => {};
  }, []);

  return (
    <div>
      <Header />
      <div className="w-full p-4">
        <Tabs aria-label="Options" color="primary">
          <Tab key="newUser" title="Criar Usuário">
            <CreateUser />
          </Tab>
          <Tab key="allUsers" title="Todos os Usuários">
            <Table aria-label="Tabble with all users">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
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
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
