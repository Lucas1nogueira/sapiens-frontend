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
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { ModalType } from "types/modal";
import { Logo } from "@components/Common/Logo";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { MenuItem } from "types/menu";

interface Props {
  useDisclosure: ModalType;
  menuItems?: MenuItem[];
}

export function Header({ useDisclosure, menuItems }: Props) {
  const { user, handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <Navbar
      aria-label="Main navigation"
      maxWidth="full"
      isMenuOpen={true}
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

      <NavbarMenu className={`transition-all duration-300`}>
        {menuItems?.map((item, index) => (
          <NavbarMenuItem
            key={`${item.title}-${index}`}
            onClick={() => {
              item.onClick();
              setSelectedTab(item.title);
              setIsMenuOpen(false);
            }}
          >
            <div
              className={`border-2 border-transparent cursor-pointer rounded-lg flex items-center p-2 ${
                isMenuOpen ? "gap-1 hover:border-white" : "justify-center"
              } ${isMenuOpen && selectedTab === item.title && "bg-white"}`}
            >
              <span
                className={`text-3xl ${
                  !isMenuOpen && selectedTab === item.title && "text-white"
                }`}
              >
                {item.icon}
              </span>
              <span className={isMenuOpen ? "ml-4" : "hidden"}>
                {item.title}
              </span>
            </div>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
