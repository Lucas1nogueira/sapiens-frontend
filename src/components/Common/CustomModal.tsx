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
  size?: "5xl" | "full";
}

export function CustomModal({ useDisclosure, content, size = "5xl" }: Props) {
  const { isOpen, onOpenChange, onClose } = useDisclosure;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      size={size}
      disableAnimation
    >
      <ModalContent>
        <ModalBody>
          <div className="py-6">{content}</div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} color="danger">
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
