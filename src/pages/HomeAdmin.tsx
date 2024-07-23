import { CreateUser } from "@components/CreateUser/CreateUser";
import { Header } from "@components/Header/Header";
import { TableUsers } from "@components/TableUsers/TableUsers";
import { Tab, Tabs, useDisclosure } from "@nextui-org/react";

export function HomeAdmin() {
  const disclosure = useDisclosure();

  return (
    <div>
      <Header useDisclosure={disclosure} />
      <div className="max-w-5xl mx-auto w-full p-4">
        <Tabs aria-label="Options" color="primary">
          <Tab key="newUser" title="Criar Usuário">
            <CreateUser />
          </Tab>
          <Tab key="allUsers" title="Todos os Usuários">
            <TableUsers />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
