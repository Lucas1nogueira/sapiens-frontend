import { CreateDiscipline } from "@components/Admin/CreateDiscipline";
import { CreateSchoolClass } from "@components/Admin/CreateSchoolClass";
import { CustomModal } from "@components/Common/CustomModal";
import { TableDiscipline } from "@components/Discipline/TableDiscipline";
import { TableUsers } from "@components/Admin/TableUsers";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { CreateUser } from "@components/Admin/CreateUser";
import { Header } from "@components/Common/Header";
import { CustomTableHeader } from "@components/Common/CustomTableHeader";
import { TableSchoolClass } from "@components/SchoolClass/TableSchoolClass";
import { Icon } from "@iconify/react";
import { MenuItem } from "types/menu";
import { Calendar } from "@components/Common/Calendar";

const generateMenuItems = (
  setSelectedTab: (tabIndex: number) => void
): MenuItem[] => [
  {
    title: "Usuários",
    icon: <Icon icon="fa-solid:users" />,
    onClick: () => setSelectedTab(0),
  },
  {
    title: "Disciplinas",
    icon: <Icon icon="wpf:books" />,
    onClick: () => setSelectedTab(1),
  },
  {
    title: "Turmas",
    icon: <Icon icon="mdi:class" />,
    onClick: () => setSelectedTab(2),
  },
  {
    title: "Horários",
    icon: <Icon icon="uis:schedule" />,
    onClick: () => setSelectedTab(3),
  },
];

type TabContentProps = {
  filterValue: string;
  customModalDisclosure: ReturnType<typeof useDisclosure>;
  openModal: (content: JSX.Element) => void;
  setFilterValue: (value: string) => void;
  content: JSX.Element;
  TableComponent?: React.ComponentType<{
    filterValue: string;
    customModalDisclosure: ReturnType<typeof useDisclosure>;
  }>;
};

const TabContent = ({
  filterValue,
  content,
  openModal,
  setFilterValue,
  TableComponent,
  customModalDisclosure,
}: TabContentProps) => (
  <>
    <CustomTableHeader
      openModal={openModal}
      content={content}
      filterValue={filterValue}
      onClear={() => setFilterValue("")}
      onSearchChange={(value) => setFilterValue(value)}
    />

    {TableComponent && (
      <TableComponent
        filterValue={filterValue}
        customModalDisclosure={customModalDisclosure}
      />
    )}
  </>
);

const getComponentForTab = (
  selectedTab: number,
  filterValue: string,
  customModalDisclosure: ReturnType<typeof useDisclosure>,
  openModal: (content: JSX.Element) => void,
  setFilterValue: (value: string) => void
) => {
  const tabComponents = [
    {
      content: <CreateUser />,
      TableComponent: TableUsers,
    },
    {
      content: <CreateDiscipline />,
      TableComponent: TableDiscipline,
    },
    {
      content: <CreateSchoolClass />,
      TableComponent: TableSchoolClass,
    },
    {
      content: <Calendar />,
    },
  ];

  const { content, TableComponent } = tabComponents[selectedTab] || {};

  return TableComponent ? (
    <TabContent
      filterValue={filterValue}
      customModalDisclosure={customModalDisclosure}
      openModal={openModal}
      setFilterValue={setFilterValue}
      content={content}
      TableComponent={TableComponent}
    />
  ) : (
    content
  );
};

export function HomeAdmin() {
  const disclosure = useDisclosure();
  const customModalDisclosure = useDisclosure();
  const [content, setContent] = useState<JSX.Element>(<CreateUser />);
  const [filterValue, setFilterValue] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const openModal = (content: JSX.Element) => {
    setContent(content);
    customModalDisclosure.onOpenChange();
  };

  const menuItems = generateMenuItems(setSelectedTab);

  return (
    <div>
      <Header useDisclosure={disclosure} menuItems={menuItems} />
      <div className="max-w-5xl mx-auto p-4">
        {getComponentForTab(
          selectedTab,
          filterValue,
          customModalDisclosure,
          openModal,
          setFilterValue
        )}

        <CustomModal useDisclosure={customModalDisclosure} content={content} />
      </div>
    </div>
  );
}
