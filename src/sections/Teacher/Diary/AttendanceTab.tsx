import { LoadingPage } from "@pages/LoadingPage";
import { useEffect, useState } from "react";
import { TableAttendance } from "sections/Attendance/TableAttendance";
import { findLessonsByDiscipline } from "services/lessonService";
import { Discipline } from "types/discipline";
import { Lesson } from "types/lesson";
import { Student } from "types/student";

type Props = {
  sortedStudents: Student[];
  discipline: Discipline;
};

export function AttendanceTab({ discipline, sortedStudents }: Props) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    findLessonsByDiscipline(discipline.code)
      .then((response) => setLessons(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [discipline.code]);

  if (loading) return <LoadingPage />;

  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow rounded-lg">
      <h1 className="text-center text-2xl font-bold text-gray-800">
        Frequência
      </h1>
      <TableAttendance lessons={lessons} sortedStudents={sortedStudents} />
    </div>
  );
}
