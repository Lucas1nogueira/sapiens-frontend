import { useState, useEffect, useMemo } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import {
  findAttendancesByLesson,
  saveManyAttendances,
} from "services/attendanceService";
import { Attendance } from "types/attendance";
import { Lesson } from "types/lesson";
import { formatDate } from "utils/formatDate";
import { Student } from "types/student";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  lessons: Lesson[];
  sortedStudents: Student[];
};

export function TableAttendance({ lessons, sortedStudents }: Props) {
  const [attendances, setAttendances] = useState(new Map<string, Attendance>());

  const sortedLessons = useMemo(() => {
    return lessons.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [lessons]);

  useEffect(() => {
    const allAttendancesPromises = sortedLessons.map((lesson) =>
      findAttendancesByLesson(lesson.id)
    );

    Promise.all(allAttendancesPromises)
      .then((responses) => {
        const allAttendances = responses.flatMap((response) => response.data);

        // Criar um mapeamento para armazenar as presencas existentes melhorando a performance
        const attendanceMap = new Map<string, Attendance>();
        allAttendances.forEach((attendance) => {
          attendanceMap.set(
            `${attendance.student.id}-${attendance.lesson.id}`,
            attendance
          );
        });

        // Criar um array de presencas cheias com as presencas existentes e novas
        sortedStudents.forEach((student) =>
          sortedLessons.forEach((lesson) => {
            const key = `${student.id}-${lesson.id}`;
            const existingAttendance = attendanceMap.get(key);

            // Crie uma nova frequência se não existir
            const attendance: Attendance = existingAttendance
              ? existingAttendance
              : {
                  id: null as unknown as string,
                  student,
                  lesson,
                  attendedCount: 0,
                  isPresent: false,
                };

            attendanceMap.set(key, attendance);
          })
        );

        setAttendances(attendanceMap);
      })
      .catch((error) => console.log(error.response.data));
  }, [sortedStudents, sortedLessons]);

  const handleAttendanceChange = (
    studentId: string,
    lessonId: string,
    isPresent: boolean,
    attendedCount: number
  ) => {
    setAttendances((prevAttendances) => {
      const updatedAttendances = new Map(prevAttendances);

      const key = `${studentId}-${lessonId}`;
      const existingAttendance = updatedAttendances.get(key);

      if (existingAttendance) {
        updatedAttendances.set(key, {
          ...existingAttendance,
          isPresent: isPresent,
          attendedCount: attendedCount,
        });
      }

      return updatedAttendances;
    });
  };

  const handleSubmit = () => {
    // Filtra frequências para salvar, mantendo id como null para novas entradas
    const attendancesToSave: Attendance[] = Array.from(
      attendances.values()
    ).map((attendance) => ({
      ...attendance,
      id: attendance.id ?? null,
    }));

    saveManyAttendances(attendancesToSave)
      .then(() =>
        enqueueNotification("Presenças salvas com sucesso!", "success")
      )
      .catch((error) =>
        enqueueNotification(error.response.data.message, "error")
      );
  };

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

          {sortedStudents.map((student) => (
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
                const key = `${student.id}-${lesson.id}`;
                const attendance = attendances.get(key);

                return (
                  <div key={lesson.id} className="flex-1 text-center p-2">
                    <Checkbox
                      isSelected={attendance?.isPresent ?? false}
                      onValueChange={(value) => {
                        handleAttendanceChange(
                          student.id,
                          lesson.id,
                          value,
                          value ? lesson.manyLessons : 0
                        );
                      }}
                    />
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
