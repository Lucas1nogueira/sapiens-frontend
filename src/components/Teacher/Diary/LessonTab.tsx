import { Discipline } from "types/discipline";
import { TableLesson } from "../../Lesson/TableLesson";
import { CustomTableHeader } from "@components/Common/CustomTableHeader";
import { useState } from "react";
import { CustomModal } from "@components/Common/CustomModal";
import { useDisclosure } from "@nextui-org/react";
import { ChangeLesson } from "@components/Lesson/ChangeLesson";

type Props = {
  discipline: Discipline;
  handleTabChange: (newTab: string, breadcrumb: string) => void;
};

export function LessonTab({ discipline, handleTabChange }: Props) {
  const [content, setContent] = useState<JSX.Element>(<></>);
  const [filterValue, setFilterValue] = useState<string>("");
  const disclosure = useDisclosure();

  const handleCreateLesson = () => {
    setContent(<ChangeLesson discipline={discipline} />);
    disclosure.onOpenChange();
  };

  return (
    <>
      <CustomTableHeader
        openModal={handleCreateLesson}
        content={content}
        filterValue={filterValue}
        onClear={() => setFilterValue("")}
        onSearchChange={(value) => setFilterValue(value)}
        inputPlaceholder="Buscar por nome ou data..."
      />
      <TableLesson
        discipline={discipline}
        filterValue={filterValue}
        createDisclosure={disclosure}
        handleTabChange={handleTabChange}
      />

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
