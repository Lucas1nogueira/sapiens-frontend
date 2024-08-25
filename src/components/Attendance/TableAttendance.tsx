import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { findAttendancesByLesson } from "services/attendanceService";
import { Attendance } from "types/attendance";
import { Lesson } from "types/lesson";

const columns = [
  { key: "date", label: "Data" },
  { key: "attendedCount", label: "Presença" },
  { key: "student", label: "Estudante" },
  { key: "lesson", label: "Aula" },
];

type Props = {
  lesson: Lesson;
};

export function TableAttendance({ lesson }: Props) {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  // const [content, setContent] = useState<JSX.Element>(<></>);
  // const disclosure = useDisclosure();

  useEffect(() => {
    findAttendancesByLesson(lesson.id)
      .then((response) => setAttendances(response.data))
      .catch((error) => console.log(error.response.data));
  }, [lesson.id]);

  const items = useMemo(() => {
    return attendances;

    // if (!filterValue) {
    // }

    // return attendances.filter((attendance) => {
    //   return attendance.date.toLowerCase().includes(filterValue.toLowerCase());
    // });
  }, [attendances]);

  return (
    <>
      <Table aria-label="Tabble with all attendances">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(attendance) => (
            <TableRow key={attendance.id}>
              <TableCell>{attendance.date}</TableCell>
              <TableCell>{attendance.attendedCount}</TableCell>
              <TableCell>{attendance.student.name}</TableCell>
              <TableCell>{attendance.lesson.description}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* <CustomModal useDisclosure={disclosure} content={content} /> */}
    </>
  );
}
