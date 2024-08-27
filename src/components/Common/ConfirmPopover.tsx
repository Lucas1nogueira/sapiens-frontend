import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";

type Props = {
  trigger: JSX.Element;
  title: string;
  confirmAction: JSX.Element;
};

export function ConfirmPopover({ trigger, title, confirmAction }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      placement="top"
      offset={20}
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center flex-col gap-4 p-4">
          <h1>{title}</h1>
          <div className="flex gap-4">
            {confirmAction}
            <Button color="secondary" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
