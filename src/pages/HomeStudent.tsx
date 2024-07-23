import { Header } from "@components/Header/Header";
import { useAuth } from "@hooks/useAuth";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { api } from "services/api";
import { ApiResponse } from "types/api";
import { Student } from "types/student";

export function HomeStudent() {
  const disclosure = useDisclosure();
  const { user } = useAuth();
  const [userData, setUserData] = useState<Student>({} as Student);

  useEffect(() => {
    api
      .get<ApiResponse<Student>>(`student/email/${user?.email}`)
      .then((response) => {
        setUserData(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {};
  }, [user]);

  return (
    <div>
      <Header useDisclosure={disclosure} />
      <Modal isOpen={disclosure.isOpen} onOpenChange={disclosure.onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <h1>Informações do Usuário</h1>
          </ModalHeader>
          <ModalBody>
            <Input value={userData?.name ?? "Sem Nome"} readOnly />
            <Input value={userData?.email ?? "Sem Email"} readOnly />
            <Input value={userData?.age + "" ?? "Sem Idade"} readOnly />
            <Input
              value={userData?.matriculation ?? "Sem Matricula"}
              readOnly
            />
            <Input value={userData?.role ?? "Sem Permissão"} readOnly />
            <Input value={userData?.sex ?? "Sem Sexo"} readOnly />
          </ModalBody>
          <ModalFooter>
            <Button onClick={disclosure.onClose}>Ok</Button>
            <Button color="primary">Atualizar Informações</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
