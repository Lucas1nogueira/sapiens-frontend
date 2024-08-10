import { Header } from "@components/Header/Header";
import { StudentProfile } from "@components/StudentProfile/StudentProfile";
import { StudentSchoolClass } from "@components/StudentSchoolClass/StudentSchoolClass";
import { UserProfile } from "@components/UserProfile/UserProfile";
import { Tab, Tabs, useDisclosure } from "@nextui-org/react";

export function HomeStudent() {
  const disclosure = useDisclosure();

  return (
    <div>
      <Header useDisclosure={disclosure} />
      <UserProfile
        updateDisclosure={disclosure}
        updateProfile={<StudentProfile />}
      />
      <div className="max-w-5xl mx-auto p-4">
        <Tabs
          aria-label="Options"
          color="primary"
          className="max-w-5xl w-full overflow-x-auto"
          classNames={{
            tabList: "overflow-x-visible",
          }}
        >
          <Tab key="schoolClass" title="Turma">
            <StudentSchoolClass />
          </Tab>
          <Tab key="grades" title="Notas">
            <p>Notas</p>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
