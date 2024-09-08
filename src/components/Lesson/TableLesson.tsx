import { CustomModal } from "@components/Common/CustomModal";
import { Icon } from "@iconify/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { deleteLesson, findLessonsByDiscipline } from "services/lessonService";
import { Discipline } from "types/discipline";
import { Lesson } from "types/lesson";
import { ModalType } from "types/modal";
import { formatDate } from "utils/formatDate";
import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { ChangeLesson } from "./ChangeLesson";
import { enqueueNotification } from "utils/enqueueNotification";

const columns = [
  { key: "description", label: "Descricão" },
  { key: "date", label: "Data" },
  { key: "attendance", label: "Presença" },
  { key: "edit", label: "Editar" },
  { key: "delete", label: "Excluir" },
];

type Props = {
  discipline: Discipline;
  filterValue: string;
  createDisclosure: ModalType;
  handleTabChange: (newTab: string, breadcrumb: string) => void;
};

export function TableLesson({
  discipline,
  filterValue,
  createDisclosure,
  handleTabChange,
}: Props) {
  const [lessons, setLesson] = useState<Lesson[]>([]);
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  useEffect(() => {
    findLessonsByDiscipline(discipline.code)
      .then((response) => setLesson(response.data))
      .catch((error) => console.log(error));
  }, [disclosure.isOpen, discipline.code, createDisclosure.isOpen]);

  const items = useMemo(() => {
    if (!filterValue) {
      return lessons;
    }

    return lessons.filter((lesson) => {
      return (
        lesson.description.toLowerCase().includes(filterValue.toLowerCase()) ||
        formatDate(lesson.date).includes(filterValue)
      );
    });
  }, [lessons, filterValue]);

  const hadleAttendance = () =>
    handleTabChange("attendance", "Registro de Frequências");

  const handleEdit = (lesson: Lesson) => {
    setContent(<ChangeLesson discipline={discipline} lesson={lesson} />);
    disclosure.onOpenChange();
  };

  const handleDelete = (lesson: Lesson) => {
    deleteLesson(lesson.id)
      .then(() => {
        enqueueNotification("Aula excluída com sucesso!", "success");

        setLesson((prevLessons) =>
          prevLessons.filter((l) => l.id !== lesson.id)
        );
      })
      .catch((error) => enqueueNotification(error.response.data, "error"));
  };

  return (
    <>
      <Table aria-label="Tabble with all lessons">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.description}</TableCell>
              <TableCell>{formatDate(lesson.date) ?? "Sem Data"}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={hadleAttendance}
                  isIconOnly
                >
                  <Icon icon="ion:calendar" width={30} />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleEdit(lesson)}
                  isIconOnly
                >
                  <Icon icon="material-symbols:edit" width={30} />
                </Button>
              </TableCell>
              <TableCell>
                <ConfirmPopover
                  trigger={
                    <Button color="danger" variant="ghost" isIconOnly>
                      <Icon icon="material-symbols:delete" width={30} />
                    </Button>
                  }
                  title="Tem certeza que deseja excluir a aula?"
                  confirmAction={
                    <Button color="danger" onClick={() => handleDelete(lesson)}>
                      Excluir
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
