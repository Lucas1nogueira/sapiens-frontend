import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Avatar, Button, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Discipline } from "types/discipline";
import { api } from "services/api";
import { LessonTab } from "./Diary/LessonTab";
import { EvaluationsTab } from "./Diary/EvaluationsTab";
import { AttendanceTab } from "./Diary/AttendanceTab";
import { GradesTab } from "./Diary/GradesTab";
import { DiaryTab } from "./Diary/DiaryTab";
import { Student } from "types/student";

type Props = {
  discipline: Discipline;
  setDiscipline: (discipline: Discipline | null) => void;
};

const breadcrumbTabMap: Record<string, string> = {
  Diário: "diary",
  "Registro de Aulas": "lesson",
  "Registro de Frequências": "attendance",
  "Registro de Avaliações": "evaluations",
  "Registro de Notas": "grades",
};

export function SchoolClassDiscipline({ discipline, setDiscipline }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [breadcrumbPath, setBreadcrumbPath] = useState<string[]>(["Diário"]);
  const [activeTab, setActiveTab] = useState<string>("diary");

  useEffect(() => {
    api
      .get<Student[]>(`school-class/students-discipline/${discipline.code}`)
      .then((response) => setStudents(response.data))
      .catch((error) => console.log(error.response.data));
  }, [discipline.code]);

  const handleTabChange = (newTab: string, breadcrumb: string) => {
    setActiveTab(newTab);
    setBreadcrumbPath((prev) => [...prev.slice(0, 1), breadcrumb]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = breadcrumbPath.slice(0, index + 1);
    const selectedTab = breadcrumbTabMap[newPath[index]];

    if (selectedTab) {
      setActiveTab(selectedTab);
      setBreadcrumbPath(newPath);
    }
  };

  const sortedStudents = useMemo(
    () => students.sort((a, b) => a.name.localeCompare(b.name)),
    [students]
  );

  const tabs: Record<string, JSX.Element> = {
    diary: (
      <DiaryTab
        key={activeTab}
        discipline={discipline}
        handleTabChange={handleTabChange}
      />
    ),
    lesson: (
      <LessonTab
        key={activeTab}
        discipline={discipline}
        handleTabChange={handleTabChange}
      />
    ),
    attendance: (
      <AttendanceTab
        key={activeTab}
        sortedStudents={sortedStudents}
        discipline={discipline}
      />
    ),
    evaluations: <EvaluationsTab key={activeTab} discipline={discipline} />,
    grades: (
      <GradesTab
        key={activeTab}
        sortedStudents={sortedStudents}
        discipline={discipline}
      />
    ),
  };

  return (
    <div key={discipline.code} className="w-full flex flex-col">
      <div className="flex justify-between items-center flex-wrap my-4">
        <Button color="primary" isIconOnly onClick={() => setDiscipline(null)}>
          <Icon icon="ion:chevron-back" />
        </Button>
        <div className="flex gap-2 items-center">
          <div>
            <p className="text-tiny uppercase font-bold text-right">
              {discipline.name}
            </p>
            <p className="text-xs text-right">{discipline?.teacher?.name}</p>
          </div>
          <Avatar
            isBordered
            radius="sm"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        </div>
        <Divider className="my-2" />
      </div>

      <Breadcrumbs className="mb-4" size="lg">
        {breadcrumbPath.map((crumb, index) => (
          <BreadcrumbItem
            key={index}
            onPress={() => handleBreadcrumbClick(index)}
          >
            {crumb}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>

      {tabs[activeTab]}
    </div>
  );
}
