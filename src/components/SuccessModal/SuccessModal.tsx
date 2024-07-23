import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ModalType } from "types/modal";

interface Props {
  useDisclosure: ModalType;
  successMessage: string;
}

export function SuccessModal({ useDisclosure, successMessage }: Props) {
  const { isOpen, onOpenChange } = useDisclosure;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <h1>A Operação foi Concluída com Sucesso</h1>
        </ModalHeader>
        <ModalBody>
          <p>{successMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onOpenChange} color="success">
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
