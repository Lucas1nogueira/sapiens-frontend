export const rolesOfSuperAdmin = [
  { key: "ADMIN", label: "Administrador" },
  { key: "TEACHER", label: "Professor" },
  { key: "STUDENT", label: "Aluno" },
  { key: "GUARDIAN", label: "Responsável" },
  { key: "CORDINATOR", label: "Coordenador" },
  { key: "SUPERADMIN", label: "Super Administrador" },
];

export const rolesOfAdmin = [
  { key: "TEACHER", label: "Professor" },
  { key: "STUDENT", label: "Aluno" },
  { key: "GUARDIAN", label: "Responsável" },
];

export const roleToEndpoint: Record<string, string> = {
  TEACHER: "teacher/save",
  STUDENT: "student/save",
  GUARDIAN: "guardian/save",
  CORDINATOR: "cordinator/save",
  ADMIN: "admin/save",
  SUPERADMIN: "auth/register",
};

export const rolesEnum = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  CORDINATOR: "CORDINATOR",
  GUARDIAN: "GUARDIAN",
  SUPERADMIN: "SUPERADMIN",
};
