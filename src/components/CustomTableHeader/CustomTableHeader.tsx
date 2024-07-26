import { Button, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";

type Props = {
  openModal: (content: JSX.Element) => void;
  content: JSX.Element;
  filterValue: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
};

export function TableHeader({
  openModal,
  content,
  filterValue,
  onSearchChange,
  onClear,
}: Props) {
  return (
    <div className="flex justify-between mb-4">
      <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Buscar por nome..."
        startContent={<Icon icon="ic:baseline-search" />}
        value={filterValue}
        onClear={() => onClear()}
        onValueChange={onSearchChange}
      />
      <Button
        color="primary"
        endContent={<Icon icon="ic:baseline-plus" />}
        onClick={() => openModal(content)}
      >
        Adicionar
      </Button>
    </div>
  );
}
