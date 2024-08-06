import { Header } from "@components/Header/Header";
import { TableTeacherGroupCollege } from "@components/TableTeacherGroupCollege/TableTeacherGroupCollege";
import { TeacherProfile } from "@components/TeacherProfile/TeacherProfile";
import { UserProfile } from "@components/UserProfile/UserProfile";
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
          <Tab key="myGroupColleges" title="Minhas Turmas">
            <TableTeacherGroupCollege />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
