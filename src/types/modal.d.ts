import { UseDisclosureProps } from "@nextui-org/react";

export interface ModalType extends UseDisclosureProps {
  onOpenChange: () => void;
}
