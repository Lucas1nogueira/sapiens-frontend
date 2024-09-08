import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { Icon } from "@iconify/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { api } from "services/api";
import { ModalType } from "types/modal";
import { User } from "types/user";
import { enqueueNotification } from "utils/enqueueNotification";

const columns = [
  { key: "name", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "role", label: "Cargo" },
  { key: "edit", label: "Editar" },
  { key: "delete", label: "Excluir" },
];

type Props = {
  filterValue: string;
  customModalDisclosure: ModalType;
};

export function TableUsers({ filterValue, customModalDisclosure }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>("admin/all").then((response) => setUsers(response.data));

    return () => {};
  }, [customModalDisclosure.isOpen]);

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
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Button
                color="primary"
                variant="ghost"
                onClick={() =>
                  enqueueNotification("Funcionalidade indisponível!", "info")
                }
                isIconOnly
              >
                <Icon icon="material-symbols:edit" width={30} />
              </Button>
            </TableCell>
            <TableCell>
              <ConfirmPopover
                trigger={
                  <Button color="danger" variant="ghost" isIconOnly>
                    <Icon icon="material-symbols:delete" width={30} />
                  </Button>
                }
                title="Ainda não é possível excluir um usuário!"
                confirmAction={
                  <Button
                    color="danger"
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled
                  >
                    Excluir
                  </Button>
                }
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
