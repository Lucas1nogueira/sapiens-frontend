import { useSuccess } from "@hooks/useSuccess";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export function SuccessModal() {
  const { successMessage, clearSuccess } = useSuccess();

  return (
    <Modal isOpen={!!successMessage} onOpenChange={clearSuccess}>
      <ModalContent>
        <ModalHeader>
          <h1>A Operação foi Concluída com Sucesso</h1>
        </ModalHeader>
        <ModalBody>
          <p>{successMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={clearSuccess} color="success">
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
