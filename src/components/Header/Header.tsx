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
import { Logo } from "@components/Logo/Logo";

interface Props {
  useDisclosure: ModalType;
}

export function Header({ useDisclosure }: Props) {
  const { user, handleLogout } = useAuth();

  return (
    <Navbar aria-label="Main navigation">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Logo className="w-10 h-10" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown>
          <DropdownTrigger>
            <Avatar isBordered as="button" name={user?.name} />
          </DropdownTrigger>

          <DropdownMenu aria-label="Profile actions">
            <DropdownItem
              key="userEmail"
              aria-label="E-mail do Usuário"
              color="primary"
            >
              <p className="font-semibold">Entrou como</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            <DropdownItem
              key="profile"
              aria-label="Meu Perfil"
              color="primary"
              onClick={useDisclosure.onOpenChange}
            >
              Meu Perfil
            </DropdownItem>
            <DropdownItem color="danger" onClick={handleLogout}>
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
