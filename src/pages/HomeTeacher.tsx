import { Header } from "@components/Header/Header";
import { UserProfile } from "@components/UserProfile/UserProfile";
import { useDisclosure } from "@nextui-org/react";

export function HomeTeacher() {
  const disclosure = useDisclosure();

  return (
    <div>
      <Header useDisclosure={disclosure} />
      <UserProfile
        updateDisclosure={disclosure}
        updateProfile={<p>TEACHER BROOOO...</p>}
      />
    </div>
  );
}
