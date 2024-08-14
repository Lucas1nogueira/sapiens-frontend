import { Header } from "@components/Common/Header";
import { TeacherProfile } from "@components/Teacher/TeacherProfile";
import { TeacherSchoolClass } from "@components/Teacher/TeacherSchoolClass";
import { UserProfile } from "@components/Common/UserProfile";
import { Tab, Tabs, useDisclosure } from "@nextui-org/react";

export function HomeTeacher() {
  const disclosure = useDisclosure();

  return (
    <div>
      <Header useDisclosure={disclosure} />
      <UserProfile
        updateDisclosure={disclosure}
        updateProfile={<TeacherProfile />}
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
          <Tab key="disciplines" title="Disciplinas">
            <TeacherSchoolClass />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
