import { Header } from "@components/Common/Header";
import { StudentProfile } from "@components/Student/StudentProfile";
import { UserProfile } from "@components/Common/UserProfile";
import { useDisclosure } from "@nextui-org/react";
import { StudentSchoolClass } from "@components/Student/StudentSchoolClass";
import { Icon } from "@iconify/react";
import { MenuItem } from "types/menu";
import { useEffect, useState } from "react";
import { SideMenu } from "@components/Common/SideMenu";
import { useAuth } from "@hooks/useAuth";
import { Discipline } from "types/discipline";
import { DisciplinesSchedule } from "@components/Discipline/DisciplinesSchedule";
import { SchoolClass } from "types/schoolClass";
import { LoadingPage } from "./LoadingPage";
import { findSchoolClassStudentId } from "services/schoolClassService";
import { findDisciplineBySchoolClassCode } from "services/disciplineService";
import { Report } from "@components/Student/Report";

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
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [schoolClass, setSchoolClass] = useState<SchoolClass>(
    {} as SchoolClass
  );
  const [selectedTab, setSelectedTab] = useState(0);
  const [loadingClass, setLoadingClass] = useState(true);
  const [loadingDisciplines, setLoadingDisciplines] = useState(true);

  useEffect(() => {
    if (schoolClass) {
      findDisciplineBySchoolClassCode(schoolClass.code)
        .then((response) => {
          setDisciplines(response.data);
        })
        .catch((error) => console.log(error.response.data))
        .finally(() => setLoadingDisciplines(false));
    }
  }, [schoolClass]);

  useEffect(() => {
    if (user) {
      findSchoolClassStudentId(user.id)
        .then((response) => {
          setSchoolClass(response.data);
        })
        .catch((error) => console.log(error.response.data))
        .finally(() => setLoadingClass(false));
    }
  }, [user]);

  if (loadingClass && loadingDisciplines) return <LoadingPage />;

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
