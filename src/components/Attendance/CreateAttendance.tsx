import { useState } from "react";
import { useError } from "@hooks/useError";
import { useSuccess } from "@hooks/useSuccess";
import { Button, Input } from "@nextui-org/react";
import { saveAttendances } from "services/attendanceService";
import { Attendance } from "types/attendance";
import { Lesson } from "types/lesson";
import { Student } from "types/student";

type Props = {
  lesson: Lesson;
  students: Student[];
};

export function CreateAttendance({ lesson, students }: Props) {
  const { setSuccess } = useSuccess();
  const { setError } = useError();
  const [date, setDate] = useState<string>("");
  const [attendances, setAttendances] = useState<Attendance[]>(
    students.map((student) => ({
      id: null as unknown as string,
      lesson,
      student,
      attendedCount: 0,
      date: "",
      isPresent: false,
    }))
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    setAttendances((prevAttendances) =>
      prevAttendances.map((attendance) => ({
        ...attendance,
        date: selectedDate,
      }))
    );
  };

  const handleAttendanceChange = (
    index: number,
    isPresent: boolean,
    attendedCount: number
  ) => {
    setAttendances((prevAttendances) => {
      const updatedAttendances = [...prevAttendances];
      updatedAttendances[index] = {
        ...updatedAttendances[index],
        isPresent,
        attendedCount,
      };
      return updatedAttendances;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    saveAttendances(attendances)
      .then(() => setSuccess("Chamada feita com sucesso!"))
      .catch((error) => setError(error.response.data));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Fazer Chamada</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            type="date"
            label="Data"
            value={date}
            onChange={handleDateChange}
            isRequired
            required
          />
          {students.map((student, index) => (
            <div
              key={student.id}
              className="w-full flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
            >
              <span className="w-1/3 text-sm font-medium">{student.name}</span>
              <Input
                type="number"
                label="Presenças"
                min={0}
                max={lesson.manyLessons}
                value={attendances[index].attendedCount.toString()}
                onChange={(e) =>
                  handleAttendanceChange(
                    index,
                    e.target.valueAsNumber > 0,
                    e.target.valueAsNumber
                  )
                }
                className="w-2/3"
              />
              <span className="w-1/3 text-sm font-medium">
                {attendances[index].isPresent ? "Presente" : "Ausente"}
              </span>
            </div>
          ))}
          <Button type="submit" color="primary" className="mt-4">
            Finalizar Chamada
          </Button>
        </form>
      </div>
    </div>
  );
}
