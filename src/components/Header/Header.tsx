import { useAuth } from "@hooks/useAuth";
import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  DropdownTrigger,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ModalType } from "types/modal";

interface Props {
  useDisclosure: ModalType;
}

export const Header = ({ useDisclosure }: Props) => {
  const { user, handleLogout } = useAuth();

  return (
    <Navbar aria-label="Main navigation">
      <NavbarContent justify="start">
        <NavbarBrand>
          <p>LOGO</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Avatar isBordered as="button" name={user?.name} />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile actions">
            <DropdownItem key="profile" aria-label="Profile">
              <p className="font-semibold">Entrou como</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="settings"
              aria-label="Settings"
              onClick={useDisclosure.onOpenChange}
            >
              Configurações
            </DropdownItem>
            <DropdownItem color="danger" onClick={handleLogout}>
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};
