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
  NavbarMenuToggle,
} from "@nextui-org/react";
import { ModalType } from "types/modal";
import { Logo } from "@components/Common/Logo";
import { Icon } from "@iconify/react";
import { useSideMenu } from "@hooks/useSideMenu";

interface Props {
  useDisclosure: ModalType;
}

export function Header({ useDisclosure }: Props) {
  const { user, handleLogout } = useAuth();
  const { isMenuOpen, setIsMenuOpen } = useSideMenu();

  return (
    <Navbar
      aria-label="Main navigation"
      maxWidth="full"
      disableAnimation
      classNames={{
        menu: `transition-all duration-300 bg-amber-500 ${
          isMenuOpen ? "w-2/3 sm:w-64" : "w-16"
        }`,
      }}
      className="shadow-sm"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          icon={
            <Icon
              className={`transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "rotate-180" : "rotate-0"
              }`}
              icon={
                isMenuOpen
                  ? "line-md:menu-to-close-alt-transition"
                  : "ic:baseline-menu"
              }
              width={30}
            />
          }
        />
        <NavbarBrand className="flex flex-col sm:flex-row">
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
