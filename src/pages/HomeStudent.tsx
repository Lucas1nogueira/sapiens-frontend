import { Header } from "@components/Common/Header";
import { StudentProfile } from "@components/Student/StudentProfile";
import { UserProfile } from "@components/Common/UserProfile";
import { useDisclosure } from "@nextui-org/react";
import { StudentSchoolClass } from "@components/Student/StudentSchoolClass";
import { Icon } from "@iconify/react";
import { MenuItem } from "types/menu";
import { useState } from "react";

const generateMenuItems = (
  setSelectedTab: (tabIndex: number) => void
): MenuItem[] => [
  {
    title: "Turma",
    icon: <Icon icon="mdi:class" />,
    onClick: () => setSelectedTab(0),
  },
];

const tabs = [<>{<StudentSchoolClass />}</>];

export function HomeStudent() {
  const disclosure = useDisclosure();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <Header
        useDisclosure={disclosure}
        menuItems={generateMenuItems(setSelectedTab)}
      />
      <UserProfile
        updateDisclosure={disclosure}
        updateProfile={<StudentProfile />}
      />
      <div className="max-w-5xl mx-auto p-4">{tabs[selectedTab]}</div>
    </div>
  );
}
