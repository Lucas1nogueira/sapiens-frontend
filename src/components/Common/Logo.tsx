import logo from "@assets/logo.png";
import { useAuth } from "@hooks/useAuth";
import { rolesEnum } from "utils/roles";

type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  const { user, userSchool } = useAuth();

  const headerTitle = () => {
    if (!user) return "";

    if (user?.role === rolesEnum.SUPERADMIN) {
      return `/ Secretaria`;
    }
    return `/ ${userSchool ? userSchool.name : "Sem Escola"}`;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <img src={logo} alt="Sapiens Logo" className={className} />
      <div className="flex flex-col text-sm sm:flex-row sm:text-xl">
        <h1 className="font-bold">Sapiens Educação</h1>
        <p className="ml-2 font-bold">{headerTitle()}</p>
      </div>
    </div>
  );
}
