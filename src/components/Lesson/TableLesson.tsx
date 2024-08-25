import { CustomModal } from "@components/Common/CustomModal";
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
import { findLessonsByDiscipline } from "services/lessonService";
import { Discipline } from "types/discipline";
import { Lesson } from "types/lesson";
import { ModalType } from "types/modal";

const columns = [
  { key: "description", label: "Descricão" },
  { key: "date", label: "Data" },
  { key: "attendance", label: "Presença" },
];

type Props = {
  discipline: Discipline;
  filterValue: string;
  createDisclosure: ModalType;
};

export function TableLesson({
  discipline,
  filterValue,
  createDisclosure,
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
        lesson.date.includes(filterValue)
      );
    });
  }, [lessons, filterValue]);

  const hadleAttendance = (lesson: Lesson) => {
    setContent(<></>);

    console.log(lesson);

    disclosure.onOpenChange();
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
              <TableCell>{lesson.date}</TableCell>
              <TableCell>
                <Button onClick={() => hadleAttendance(lesson)}>
                  Presença
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
