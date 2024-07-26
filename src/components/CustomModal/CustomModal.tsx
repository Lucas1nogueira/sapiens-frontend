import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import { ModalType } from "types/modal";

interface Props {
  useDisclosure: ModalType;
  content: JSX.Element;
}

export function CustomModal({ useDisclosure, content }: Props) {
  const { isOpen, onOpenChange } = useDisclosure;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      <ModalContent>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button onClick={onOpenChange} color="danger">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
