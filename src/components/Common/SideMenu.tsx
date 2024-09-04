import { useSideMenu } from "@hooks/useSideMenu";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { MenuItem } from "types/menu";

interface Props {
  menuItems?: MenuItem[];
}

export function SideMenu({ menuItems }: Props) {
  const [selectedTab, setSelectedTab] = useState(menuItems?.[0]?.title || "");
  const { isMenuOpen, setIsMenuOpen } = useSideMenu();

  const getIcon = (item: MenuItem) => (
    <span
      className={`text-3xl ${
        !isMenuOpen && selectedTab === item.title && "text-white"
      }`}
    >
      {item.icon}
    </span>
  );

  return (
    <div
      className={`bg-[#88A3E2] fixed left-0 z-50 transition-all duration-300 p-4 min-h-screen h-full overflow-y-auto
        ${isMenuOpen ? "w-64" : "hidden lg:block lg:w-16"}`}
    >
      {menuItems?.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          onClick={() => {
            item.onClick();
            setSelectedTab(item.title);
            setIsMenuOpen(false);
          }}
          className="my-2"
        >
          <div
            className={`border-2 border-transparent cursor-pointer rounded-lg flex items-center p-2 ${
              isMenuOpen ? "gap-1 hover:border-white" : "justify-center"
            } ${isMenuOpen && selectedTab === item.title && "bg-white"}`}
          >
            {isMenuOpen ? (
              getIcon(item)
            ) : (
              <Tooltip
                className="bg-[#88A3E2] font-semibold"
                content={item.title}
                shadow="lg"
                radius="sm"
                placement="right-start"
              >
                {getIcon(item)}
              </Tooltip>
            )}
            <span className={isMenuOpen ? "ml-4" : "hidden"}>{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
