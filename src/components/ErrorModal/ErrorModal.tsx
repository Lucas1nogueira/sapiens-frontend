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
  errorMessage: string;
}

export const ErrorModal = ({ useDisclosure, errorMessage }: Props) => {
  const { isOpen, onOpenChange } = useDisclosure;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <h1>Ocorreu um Erro</h1>
        </ModalHeader>
        <ModalBody>
          <p>{errorMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onOpenChange} color="danger">
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
