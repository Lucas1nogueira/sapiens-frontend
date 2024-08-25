import { Discipline } from "types/discipline";
import { TableLesson } from "../../Lesson/TableLesson";
import { CustomTableHeader } from "@components/Common/CustomTableHeader";
import { useState } from "react";
import { CreateLesson } from "@components/Lesson/CreateLesson";
import { CustomModal } from "@components/Common/CustomModal";
import { useDisclosure } from "@nextui-org/react";

type Props = {
  discipline: Discipline;
};

export function LessonTab({ discipline }: Props) {
  const [content, setContent] = useState<JSX.Element>(<></>);
  const [filterValue, setFilterValue] = useState<string>("");
  const disclosure = useDisclosure();

  const handleCreateLesson = () => {
    setContent(<CreateLesson discipline={discipline} />);
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
      />

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
