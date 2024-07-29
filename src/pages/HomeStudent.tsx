import { Header } from "@components/Header/Header";
import { StudentProfile } from "@components/StudentProfile/StudentProfile";
import { UserProfile } from "@components/UserProfile/UserProfile";
import { useDisclosure } from "@nextui-org/react";

export function HomeStudent() {
  const disclosure = useDisclosure();

  return (
    <div>
      <Header useDisclosure={disclosure} />
      <UserProfile
        updateDisclosure={disclosure}
        updateProfile={<StudentProfile />}
      />
    </div>
  );
}
