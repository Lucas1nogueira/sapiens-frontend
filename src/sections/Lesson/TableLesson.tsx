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
import { useMemo, useState } from "react";
import { deleteLesson, findLessonsByDiscipline } from "services/lessonService";
import { Discipline } from "types/discipline";
import { Lesson } from "types/lesson";
import { ModalType } from "types/modal";
import { formatDate } from "utils/formatDate";
import { ConfirmPopover } from "@components/Common/ConfirmPopover";
import { ChangeLesson } from "./ChangeLesson";
import { enqueueNotification } from "utils/enqueueNotification";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loading } from "@components/Common/Loading";
import { EmptyContent } from "@components/Common/EmptyContent";

const columns = [
  { key: "description", label: "Descrição" },
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
  handleTabChange,
}: Props) {
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  const {
    data: lessonsData,
    isLoading: lessonsLoading,
    refetch,
  } = useQuery({
    queryKey: ["tableLessons", discipline.code],
    queryFn: () => findLessonsByDiscipline(discipline.code),
  });

  const lessons = useMemo(() => lessonsData || [], [lessonsData]);

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

  const handleAttendance = () =>
    handleTabChange("attendance", "Registro de Frequências");

  const handleEdit = (lesson: Lesson) => {
    setContent(<ChangeLesson discipline={discipline} lesson={lesson} />);
    disclosure.onOpenChange();
  };

  const mutationDelete = useMutation({
    mutationFn: (id: string) => deleteLesson(id),
    onSuccess: async () => {
      await refetch();

      enqueueNotification("Aula excluída com sucesso!", "success");
    },
    onError: () => {
      enqueueNotification("Erro ao excluir aula.", "error");
    },
  });

  const handleDelete = (lesson: Lesson) => mutationDelete.mutate(lesson.id);

  return (
    <>
      <Table aria-label="Table with all lessons">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={lessonsLoading}
          loadingContent={<Loading />}
          emptyContent={<EmptyContent />}
        >
          {(lesson) => (
            <TableRow key={lesson.id}>
              <TableCell>{lesson.description}</TableCell>
              <TableCell>{formatDate(lesson.date) ?? "Sem Data"}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={handleAttendance}
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
                    <Button
                      color="danger"
                      onClick={() => handleDelete(lesson)}
                      isLoading={mutationDelete.isPending}
                    >
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
