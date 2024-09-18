import { CustomModal } from "@components/Common/CustomModal";
import { useAuth } from "@hooks/useAuth";
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
import { LoadingPage } from "@pages/LoadingPage";
import { useMemo, useState } from "react";
import { Subject } from "types/report";
import { ReportDetails } from "./ReportDetails";
import { studentReport } from "services/studentService";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@components/Common/Loading";
import { EmptyContent } from "@components/Common/EmptyContent";

const columns = [
  { key: "discipline", label: "Disciplina" },
  { key: "totalLessons", label: "C.H" },
  { key: "completed", label: "Aulas" },
  { key: "missed", label: "Faltas" },
  { key: "attendance", label: "Presença" },
  { key: "status", label: "Situação" },
  { key: "grade", label: "Nota" },
  { key: "details", label: "Detalhes" },
];

export function Report() {
  const { user } = useAuth();
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  const { data: report, isLoading: reportLoading } = useQuery({
    queryKey: ["report", user],
    queryFn: () => studentReport(user?.id as string),
    enabled: !!user,
  });

  const handleReportDetails = (subject: Subject) => {
    setContent(<ReportDetails subject={subject} />);
    disclosure.onOpen();
  };

  const subjects = useMemo(() => report?.subjects || [], [report]);

  const totalLessons = useMemo(
    () => subjects.reduce((sum, subject) => sum + subject.manyLessons, 0),
    [subjects]
  );

  const totalCompletedLessons = useMemo(
    () => subjects.reduce((sum, subject) => sum + subject.completedLessons, 0),
    [subjects]
  );

  const totalMissedLessons = useMemo(
    () => subjects.reduce((sum, subject) => sum + subject.lessonsMissed, 0),
    [subjects]
  );

  const attendancePercentage = useMemo(() => {
    return totalMissedLessons !== 0
      ? 100.0 - (totalMissedLessons / totalCompletedLessons) * 100
      : 100.0;
  }, [totalMissedLessons, totalCompletedLessons]);

  if (!report) return <LoadingPage />;

  return (
    <>
      <Table aria-label="Table of student report">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={subjects}
          isLoading={reportLoading}
          loadingContent={<Loading />}
          emptyContent={<EmptyContent />}
        >
          {(subject) => (
            <TableRow key={subject.disciplineCode}>
              <TableCell>{subject.disciplineName}</TableCell>
              <TableCell>{subject.manyLessons}</TableCell>
              <TableCell>{subject.completedLessons}</TableCell>
              <TableCell>{subject.lessonsMissed}</TableCell>
              <TableCell>{subject.attendancePercentage.toFixed(2)}%</TableCell>
              <TableCell>{subject.status}</TableCell>
              <TableCell>{subject.finalGrade.toFixed(1)}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="ghost"
                  onClick={() => handleReportDetails(subject)}
                  isIconOnly
                >
                  <Icon icon="mdi:eye" />
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="bg-zinc-300 p-1 rounded-md mt-2 min-w-[240px] overflow-x-auto">
        <div className="grid grid-cols-5 gap-4 min-w-[320px] items-center">
          <p className="text-center font-semibold">{""}</p>
          <p className="text-center font-semibold">C.H</p>
          <p className="text-center font-semibold">Aulas</p>
          <p className="text-center font-semibold">Faltas</p>
          <p className="text-center font-semibold">Presença</p>
        </div>
        <div className="grid grid-cols-5 gap-4 min-w-[320px]">
          <p className="text-center font-semibold">Totais</p>
          <p className="text-center">{totalLessons}</p>
          <p className="text-center">{totalCompletedLessons}</p>
          <p className="text-center">{totalMissedLessons}</p>
          <p className="text-center">{attendancePercentage.toFixed(2)}%</p>
        </div>
      </div>

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
