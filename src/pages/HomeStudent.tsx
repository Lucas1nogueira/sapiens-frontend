import { Header } from "@components/Header/Header";
import { UpdateStudentProfile } from "@components/UpdateStudentProfile/UpdateStudentProfile";
import { UserProfile } from "@components/UserProfile/UserProfile";
import { useDisclosure } from "@nextui-org/react";

export function HomeStudent() {
  const disclosure = useDisclosure();

  return (
    <div>
      <Header useDisclosure={disclosure} />
      <UserProfile
        updateDisclosure={disclosure}
        updateProfile={<UpdateStudentProfile />}
      />
    </div>
  );
}
