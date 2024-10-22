import { Header } from "@components/Common/Header";
import { StudentProfile } from "sections/Student/StudentProfile";
import { UserProfile } from "@components/Common/UserProfile";
import { useDisclosure } from "@nextui-org/react";
import { StudentSchoolClass } from "sections/Student/StudentSchoolClass";
import { Icon } from "@iconify/react";
import { MenuItem } from "types/menu";
import { useState } from "react";
import { SideMenu } from "@components/Common/SideMenu";
import { useAuth } from "@hooks/useAuth";
import { Discipline } from "types/discipline";
import { SchoolClass } from "types/schoolClass";
import { LoadingPage } from "./LoadingPage";
import { findSchoolClassStudentId } from "services/schoolClassService";
import { findDisciplineBySchoolClassCode } from "services/disciplineService";
import { Report } from "sections/Student/Report";
import { DisciplinesSchedule } from "sections/Discipline/DisciplinesSchedule";
import { useQuery } from "@tanstack/react-query";

const generateMenuItems = (
  setSelectedTab: (tabIndex: number) => void
): MenuItem[] => [
  {
    title: "Turma",
    icon: <Icon icon="mdi:class" />,
    onClick: () => setSelectedTab(0),
  },
  {
    title: "Horários",
    icon: <Icon icon="uis:schedule" />,
    onClick: () => setSelectedTab(1),
  },
  {
    title: "Boletim",
    icon: <Icon icon="fluent-mdl2:report-library" />,
    onClick: () => setSelectedTab(2),
  },
];

export function HomeStudent() {
  const { user } = useAuth();
  const disclosure = useDisclosure();
  const [selectedTab, setSelectedTab] = useState(0);

  const { data: schoolClassData, isLoading: schoolClassLoading } = useQuery({
    queryKey: ["schoolClass", user?.id],
    queryFn: () => {
      return findSchoolClassStudentId(user?.id as string);
    },
    enabled: !!user?.id,
  });

  const schoolClass = (schoolClassData as SchoolClass) || {};

  const { data: disciplinesData, isLoading: disciplinesLoading } = useQuery({
    queryKey: ["disciplines"],
    queryFn: () => {
      return findDisciplineBySchoolClassCode(schoolClass.code);
    },
    enabled: !!schoolClass.code,
  });

  const disciplines = (disciplinesData as Discipline[]) || [];

  if (schoolClassLoading || disciplinesLoading) return <LoadingPage />;

  const tabs = [
    <StudentSchoolClass schoolClass={schoolClass} disciplines={disciplines} />,
    <DisciplinesSchedule disciplines={disciplines} />,
    <Report />,
  ];

  return (
    <div>
      <Header useDisclosure={disclosure} />
      <SideMenu menuItems={generateMenuItems(setSelectedTab)} />
      <UserProfile
        updateDisclosure={disclosure}
        updateProfile={<StudentProfile />}
      />
      <div className="max-w-5xl mx-auto p-4">{tabs[selectedTab]}</div>
    </div>
  );
}
