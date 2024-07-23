import { UpdateStudentProfile } from "@components/UpdateStudentProfile/UpdateStudentProfile";
import {
  Accordion,
  AccordionItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ModalType } from "types/modal";

type Props = {
  updateDisclosure: ModalType;
};

export function UserProfile({ updateDisclosure }: Props) {
  return (
    <Modal
      isOpen={updateDisclosure.isOpen}
      onOpenChange={updateDisclosure.onOpenChange}
      size="full"
    >
      <ModalContent>
        <ModalHeader>
          <h1>Meu Perfil</h1>
        </ModalHeader>
        <ModalBody>
          <Accordion>
            <AccordionItem
              key="1"
              aria-label="Alterar Dados"
              title="Alterar Dados"
            >
              <UpdateStudentProfile />
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Alterar Senha"
              title="Alterar Senha"
            >
              <p>Em breve...</p>
            </AccordionItem>
          </Accordion>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={updateDisclosure.onClose}>
            Sair
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
