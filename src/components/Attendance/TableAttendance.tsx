import { useState, useEffect } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import {
  findAttendancesByLesson,
  saveAttendances,
} from "services/attendanceService";
import { Attendance } from "types/attendance";
import { Lesson } from "types/lesson";
import { formatDate } from "utils/formatDate";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Student } from "types/student";

type Props = {
  lessons: Lesson[];
  students: Student[];
};

type TempAttendance = Omit<Attendance, "id"> & { tempId: string };

export function TableAttendance({ lessons, students }: Props) {
  const [attendances, setAttendances] = useState<TempAttendance[]>([]);
  const { setError } = useError();
  const { setSuccess } = useSuccess();

  useEffect(() => {
    const allAttendancesPromises = lessons.map((lesson) =>
      findAttendancesByLesson(lesson.id)
    );

    Promise.all(allAttendancesPromises)
      .then((responses) => {
        const allAttendances = responses.flatMap((response) =>
          response.data.map((attendance: Attendance) => ({
            ...attendance,
            tempId: crypto.randomUUID(),
          }))
        );

        const attendanceMap = new Map<string, TempAttendance>();
        allAttendances.forEach((attendance) => {
          attendanceMap.set(
            `${attendance.student.id}-${attendance.lesson.id}`,
            attendance
          );
        });

        const fullAttendances = students.map((student) =>
          lessons.map((lesson) => {
            return (
              attendanceMap.get(`${student.id}-${lesson.id}`) || {
                tempId: crypto.randomUUID(),
                student,
                attendedCount: 0,
                isPresent: false,
                lesson,
              }
            );
          })
        );

        setAttendances(fullAttendances.flat());
      })
      .catch((error) => console.log(error.response.data));
  }, [students, lessons]);

  const handleAttendanceChange = (
    studentId: string,
    lessonId: string,
    isPresent: boolean,
    attendedCount: number
  ) => {
    setAttendances((prevAttendances) => {
      const updatedAttendances = prevAttendances.map((attendance) =>
        attendance.student.id === studentId && attendance.lesson.id === lessonId
          ? { ...attendance, isPresent: isPresent, attendedCount }
          : attendance
      );
      return updatedAttendances;
    });
  };

  const handleSubmit = () => {
    const attendancesToSave: Attendance[] = attendances.map(
      ({ tempId, ...attendance }) => {
        console.log(tempId);
        return { ...attendance, id: null as unknown as string };
      }
    );

    saveAttendances(attendancesToSave)
      .then(() => setSuccess("Chamada feita com sucesso!"))
      .catch((error) => setError(error.response.data));
  };

  const sortedLessons = lessons.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="p-4">
      <Button
        color="primary"
        onClick={handleSubmit}
        className="mb-6"
        radius="sm"
      >
        Salvar
      </Button>

      <div className="overflow-x-auto">
        <div className="flex flex-col min-w-max">
          <div className="flex bg-gray-100 border-b border-gray-300">
            <div className="w-48 text-center font-semibold p-2 border-r border-gray-300 sticky left-0 bg-gray-50 z-10">
              Estudante
            </div>
            {sortedLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex-1 text-center font-semibold p-2 border-r border-gray-300"
              >
                <div>{formatDate(lesson.date)}</div>
                <div className="text-sm text-gray-500">
                  Qtd de Aulas: {lesson.manyLessons}
                </div>
              </div>
            ))}
          </div>

          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center border-b border-gray-300"
            >
              <div className="w-48 text-center py-2 bg-gray-50 border-r border-gray-300 sticky left-0 z-10">
                {student.name}{" "}
                <span className="text-sm text-blue-500">
                  ({student.matriculation})
                </span>
              </div>

              {sortedLessons.map((lesson) => {
                const attendance = attendances.find(
                  (att) =>
                    att.student.id === student.id && att.lesson.id === lesson.id
                );

                return (
                  <div key={lesson.id} className="flex-1 text-center p-2">
                    <Checkbox
                      defaultSelected={
                        attendance?.attendedCount === lesson.manyLessons
                      }
                      onValueChange={(value) => {
                        handleAttendanceChange(
                          student.id,
                          lesson.id,
                          value,
                          lesson.manyLessons
                        );
                      }}
                    >
                      {attendance?.isPresent ? "Presente" : "Ausente"}
                    </Checkbox>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
