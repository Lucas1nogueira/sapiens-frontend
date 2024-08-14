import { CreateDiscipline } from "@components/Admin/CreateDiscipline";
import { CreateSchoolClass } from "@components/Admin/CreateSchoolClass";
import { CustomModal } from "@components/Common/CustomModal";
import { TableDiscipline } from "@components/Discipline/TableDiscipline";
import { TableUsers } from "@components/Admin/TableUsers";
import { Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { CreateUser } from "@components/Admin/CreateUser";
import { Header } from "@components/Common/Header";
import { CustomTableHeader } from "@components/Common/CustomTableHeader";
import { TableSchoolClass } from "@components/SchoolClass/TableSchoolClass";

export function HomeAdmin() {
  const disclosure = useDisclosure();
  const customModalDisclosure = useDisclosure();
  const [content, setContent] = useState<JSX.Element>(<CreateUser />);
  const [filterValue, setFilterValue] = useState("");

  const openModal = (content: JSX.Element) => {
    setContent(content);
    customModalDisclosure.onOpenChange();
  };

  return (
    <div>
      <Header useDisclosure={disclosure} />
      <div className="max-w-5xl mx-auto p-4">
        <Tabs
          aria-label="Options"
          color="primary"
          className="max-w-5xl w-full overflow-x-auto"
          classNames={{
            tabList: "overflow-x-visible",
          }}
          onSelectionChange={() => setFilterValue("")}
        >
          <Tab key="newUser" title="Usuários">
            <CustomTableHeader
              openModal={openModal}
              content={<CreateUser />}
              filterValue={filterValue}
              onClear={() => setFilterValue("")}
              onSearchChange={(value) => setFilterValue(value)}
            />
            <TableUsers
              filterValue={filterValue}
              customModalDisclosure={customModalDisclosure}
            />
          </Tab>
          <Tab key="discipline" title="Disciplinas">
            <CustomTableHeader
              openModal={openModal}
              content={<CreateDiscipline />}
              filterValue={filterValue}
              onClear={() => setFilterValue("")}
              onSearchChange={(value) => setFilterValue(value)}
            />
            <TableDiscipline
              filterValue={filterValue}
              customModalDisclosure={customModalDisclosure}
            />
          </Tab>
          <Tab key="groupCollege" title="Turmas">
            <CustomTableHeader
              openModal={openModal}
              content={<CreateSchoolClass />}
              filterValue={filterValue}
              onClear={() => setFilterValue("")}
              onSearchChange={(value) => setFilterValue(value)}
            />
            <TableSchoolClass
              filterValue={filterValue}
              customModalDisclosure={customModalDisclosure}
            />
          </Tab>
        </Tabs>

        <CustomModal useDisclosure={customModalDisclosure} content={content} />
      </div>
    </div>
  );
}
