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
import { ChangePassword } from "./ChangePassword";

type Props = {
  updateDisclosure: ModalType;
  updateProfile: JSX.Element;
};

export function UserProfile({ updateDisclosure, updateProfile }: Props) {
  return (
    <Modal
      isOpen={updateDisclosure.isOpen}
      onOpenChange={updateDisclosure.onOpenChange}
      size="full"
      disableAnimation
    >
      <ModalContent>
        <ModalHeader>
          <h1>Meu Perfil</h1>
        </ModalHeader>
        <ModalBody>
          <Accordion disableAnimation>
            <AccordionItem
              key="1"
              aria-label="Alterar Dados"
              title="Alterar Dados"
            >
              {updateProfile}
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Alterar Senha"
              title="Alterar Senha"
            >
              <ChangePassword />
            </AccordionItem>
          </Accordion>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={updateDisclosure.onClose}>
            Voltar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
