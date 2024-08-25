import { CreateAttendance } from "@components/Attendance/CreateAttendance";
import { TableAttendance } from "@components/Attendance/TableAttendance";
import { CustomModal } from "@components/Common/CustomModal";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { LoadingPage } from "@pages/LoadingPage";
import { Key, useEffect, useState } from "react";
import { findLessonsByDiscipline } from "services/lessonService";
import { Discipline } from "types/discipline";
import { Lesson } from "types/lesson";
import { Student } from "types/student";

type Props = {
  students: Student[];
  discipline: Discipline;
};

export function AttendanceTab({ students, discipline }: Props) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<JSX.Element>(<></>);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const disclosure = useDisclosure();

  useEffect(() => {
    setLoading(true);
    findLessonsByDiscipline(discipline.code)
      .then((response) => {
        setLessons(response.data);
        setSelectedLesson(response.data.length ? response.data[0] : null);
      })
      .catch((error) => console.log(error.response.data))
      .finally(() => setLoading(false));
  }, [discipline.code]);

  const onSelectionChange = (key: Key | null) => {
    if (key) {
      const lesson = lessons.find((lesson) => lesson.id == (key as string));
      setSelectedLesson(lesson ? lesson : null);
    }
  };

  const handleAttendance = () => {
    setContent(
      <CreateAttendance
        students={students}
        lesson={selectedLesson ?? ({} as Lesson)}
      />
    );

    disclosure.onOpenChange();
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow rounded-lg">
      <p className="text-xl font-semibold text-gray-800">Presença</p>

      <Autocomplete
        label="Buscar uma Aula"
        variant="bordered"
        defaultItems={lessons}
        className="max-w-xs"
        selectedKey={selectedLesson ? selectedLesson.id.toString() : null}
        onSelectionChange={onSelectionChange}
      >
        {(item) => (
          <AutocompleteItem key={item.id}>{item.description}</AutocompleteItem>
        )}
      </Autocomplete>

      {selectedLesson ? (
        <>
          <Button color="primary" onClick={handleAttendance}>
            Fazer Chamada
          </Button>
          <TableAttendance lesson={selectedLesson} />
        </>
      ) : (
        <p className="text-center text-gray-500">Nenhuma aula encontrada</p>
      )}

      <CustomModal useDisclosure={disclosure} content={content} />
    </div>
  );
}
