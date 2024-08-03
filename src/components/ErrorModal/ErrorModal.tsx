import { useError } from "@hooks/useError";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export function ErrorModal() {
  const { errorMessage, clearError } = useError();

  return (
    <Modal isOpen={!!errorMessage} onOpenChange={clearError}>
      <ModalContent>
        <ModalHeader>
          <h1>Ocorreu um Erro</h1>
        </ModalHeader>
        <ModalBody>
          <p>{errorMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={clearError} color="danger">
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
