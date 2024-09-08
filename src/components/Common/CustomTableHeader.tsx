import { Button, Input } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { FilterBySchool } from "./FilterBySchool";
import { useAuth } from "@hooks/useAuth";
import { rolesEnum } from "utils/roles";

type Props = {
  openModal: (content: JSX.Element) => void;
  content: JSX.Element;
  filterValue: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
  inputPlaceholder?: string;
};

export function CustomTableHeader({
  openModal,
  content,
  filterValue,
  onSearchChange,
  onClear,
  inputPlaceholder,
}: Props) {
  const { user } = useAuth();

  return (
    <div className="flex justify-between gap-2 mb-4">
      <div className="flex gap-2 w-2/3 flex-wrap">
        <Input
          size="lg"
          className="w-full sm:max-w-[44%]"
          placeholder={inputPlaceholder ?? "Buscar por nome..."}
          startContent={<Icon icon="ic:baseline-search" />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        {user?.role === rolesEnum.SUPERADMIN && <FilterBySchool />}
      </div>
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
