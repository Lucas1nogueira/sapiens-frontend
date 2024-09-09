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
import { useEffect, useState } from "react";
import { Report as ReportType, Subject } from "types/report";
import { ReportDetails } from "./ReportDetails";
import { studentReport } from "services/studentService";

const columns = [
  { key: "discipline", label: "Disciplina" },
  { key: "lessons", label: "Aulas" },
  { key: "missed", label: "Faltas" },
  { key: "attendance", label: "Presença" },
  { key: "status", label: "Situação" },
  { key: "grade", label: "Nota" },
  { key: "details", label: "Detalhes" },
];

export function Report() {
  const { user } = useAuth();
  const [report, setReport] = useState({} as ReportType);
  const [content, setContent] = useState<JSX.Element>(<></>);
  const disclosure = useDisclosure();

  useEffect(() => {
    if (user) {
      studentReport(user.id)
        .then((response) => setReport(response.data))
        .catch((error) => console.log(error.response.data));
    }
  }, [setReport, user]);

  if (!report) return <LoadingPage />;

  const handleReportDetails = (subject: Subject) => {
    setContent(<ReportDetails report={report} subject={subject} />);
    disclosure.onOpen();
  };

  const subjects = report.subjects || [];

  return (
    <>
      <Table aria-label="Tabble of student report">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={subjects}>
          {(subject) => (
            <TableRow key={subject.disciplineCode}>
              <TableCell>{subject.disciplineName}</TableCell>
              <TableCell>{subject.manyLessons}</TableCell>
              <TableCell>{subject.lessonsAttended}</TableCell>
              <TableCell>{subject.attendancePercentage}%</TableCell>
              <TableCell>{subject.status}</TableCell>
              <TableCell>{subject.finalGrade}</TableCell>
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

      <CustomModal useDisclosure={disclosure} content={content} />
    </>
  );
}
