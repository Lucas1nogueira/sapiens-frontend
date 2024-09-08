import { Header } from "@components/Common/Header";
import { TeacherProfile } from "@components/Teacher/TeacherProfile";
import { TeacherSchoolClass } from "@components/Teacher/TeacherSchoolClass";
import { UserProfile } from "@components/Common/UserProfile";
import { useDisclosure } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { MenuItem } from "types/menu";
import { useEffect, useState } from "react";
import { SideMenu } from "@components/Common/SideMenu";
import { Discipline } from "types/discipline";
import { useAuth } from "@hooks/useAuth";
import { DisciplinesSchedule } from "@components/Discipline/DisciplinesSchedule";
import { findDisciplineByTeacherId } from "services/disciplineService";

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
];

export function HomeTeacher() {
  const { user } = useAuth();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const disclosure = useDisclosure();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (user) {
      findDisciplineByTeacherId(user.id)
        .then((response) => setDisciplines(response.data))
        .catch((error) => console.log(error));
    }
  }, [user]);

  const tabs = [
    <TeacherSchoolClass disciplines={disciplines} />,
    <DisciplinesSchedule disciplines={disciplines} />,
  ];

  return (
    <div>
      <Header useDisclosure={disclosure} />
      <SideMenu menuItems={generateMenuItems(setSelectedTab)} />
      <UserProfile
        updateDisclosure={disclosure}
        updateProfile={<TeacherProfile />}
      />
      <div className="max-w-5xl mx-auto p-4">{tabs[selectedTab]}</div>
    </div>
  );
}
