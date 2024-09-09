import { CreateSchoolClass } from "@components/Admin/CreateSchoolClass";
import { CustomModal } from "@components/Common/CustomModal";
import { TableDiscipline } from "@components/Discipline/TableDiscipline";
import { TableUsers } from "@components/Admin/TableUsers";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { ChangeUser } from "@components/Admin/ChangeUser";
import { Header } from "@components/Common/Header";
import { CustomTableHeader } from "@components/Common/CustomTableHeader";
import { TableSchoolClass } from "@components/SchoolClass/TableSchoolClass";
import { Icon } from "@iconify/react";
import { MenuItem } from "types/menu";
import { SideMenu } from "@components/Common/SideMenu";
import { Calendar } from "@components/Admin/Calendar";
import { Diary } from "@components/Admin/Diary";
import { TableSchool } from "@components/School/TableSchool";
import { Secretariat } from "@components/SuperAdmin/Secretariat";
import { ChangeDiscipline } from "@components/Discipline/ChangeDiscipline";
import { ChangeSchool } from "@components/School/ChangeSchool";

const generateMenuItems = (
  setSelectedTab: (tabIndex: number) => void
): MenuItem[] => [
  {
    title: "Secretaria",
    icon: <Icon icon="pixelarticons:buildings" />,
    onClick: () => setSelectedTab(0),
  },
  {
    title: "Usuários",
    icon: <Icon icon="fa-solid:users" />,
    onClick: () => setSelectedTab(1),
  },
  {
    title: "Disciplinas",
    icon: <Icon icon="wpf:books" />,
    onClick: () => setSelectedTab(2),
  },
  {
    title: "Turmas",
    icon: <Icon icon="mdi:class" />,
    onClick: () => setSelectedTab(3),
  },
  {
    title: "Horários",
    icon: <Icon icon="uis:schedule" />,
    onClick: () => setSelectedTab(4),
  },
  {
    title: "Diários",
    icon: <Icon icon="mdi:diary" />,
    onClick: () => setSelectedTab(5),
  },
  {
    title: "Escolas",
    icon: <Icon icon="bxs:school" />,
    onClick: () => setSelectedTab(6),
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
      content: <Secretariat />,
    },
    {
      content: <ChangeUser />,
      TableComponent: TableUsers,
    },
    {
      content: <ChangeDiscipline />,
      TableComponent: TableDiscipline,
    },
    {
      content: <CreateSchoolClass />,
      TableComponent: TableSchoolClass,
    },
    {
      content: <Calendar />,
    },
    {
      content: <Diary />,
    },
    {
      content: <ChangeSchool />,
      TableComponent: TableSchool,
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

export function HomeSuperAdmin() {
  const disclosure = useDisclosure();
  const customModalDisclosure = useDisclosure();
  const [content, setContent] = useState<JSX.Element>(<ChangeUser />);
  const [filterValue, setFilterValue] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const openModal = (content: JSX.Element) => {
    setContent(content);
    customModalDisclosure.onOpenChange();
  };

  const menuItems = generateMenuItems(setSelectedTab);

  return (
    <div className="relative">
      <Header useDisclosure={disclosure} />
      <SideMenu menuItems={menuItems} />
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
