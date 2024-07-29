import { CreateDiscipline } from "@components/CreateDiscipline/CreateDiscipline";
import { CreateUser } from "@components/CreateUser/CreateUser";
import { CustomModal } from "@components/CustomModal/CustomModal";
import { TableHeader } from "@components/CustomTableHeader/CustomTableHeader";
import { Header } from "@components/Header/Header";
import { TableDiscipline } from "@components/TableDiscipline/TableDiscipline";
import { TableUsers } from "@components/TableUsers/TableUsers";
import { Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { useState } from "react";

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
            <TableHeader
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
            <TableHeader
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
        </Tabs>

        <CustomModal useDisclosure={customModalDisclosure} content={content} />
      </div>
    </div>
  );
}
