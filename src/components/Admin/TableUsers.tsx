import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { CustomModal } from "@components/Common/CustomModal";
import { useAuth } from "@hooks/useAuth";
import { Icon } from "@iconify/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { findAllUsers, findUsersBySchoolId } from "services/adminService";
import { ModalType } from "types/modal";
import { User } from "types/user";
import { rolesEnum } from "utils/roles";
import { ChangeUser } from "./ChangeUser";

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
  const { user, userSchool } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  useEffect(() => {
    if (user && userSchool) {
      if (user?.role === rolesEnum.SUPERADMIN) {
        findAllUsers()
          .then((response) => setUsers(response.data))
          .catch((error) => console.log(error));
      } else {
        findUsersBySchoolId(userSchool.id as string)
          .then((response) => setUsers(response.data))
          .catch((error) => console.log(error));
      }
    }
  }, [customModalDisclosure.isOpen, user, userSchool]);

  const items = useMemo(() => {
    if (!filterValue) {
      return users;
    }

    return users.filter((user) => {
      return user.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }, [users, filterValue]);

  const handleEdit = (user: User) => {
    setContent(<ChangeUser userToEdit={user} />);
    disclosure.onOpenChange();
  };

  return (
    <>
      <Table aria-label="Tabble with all users">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
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
                  onClick={() => handleEdit(user)}
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

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
