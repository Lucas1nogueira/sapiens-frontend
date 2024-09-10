import { Student } from "types/student";
import { api } from "./api";
import { Report } from "types/report";

export const saveStudent = async (student: Student) => {
  const response = await api.post<Student>("student/save", student);
  return response;
};

export const updateStudent = async (student: Student) => {
  const response = await api.put<Student>("student/update", student);
  return response;
};

export const findStudentByMatriculation = async (matriculation: string) => {
  const response = await api.get<Student>(
    `student/matriculation/${matriculation}`
  );
  return response;
};

export const findStudentByEmail = async (email: string) => {
  const response = await api.get<Student>(`student/email/${email}`);
  return response;
};

export const findAllStudents = async () => {
  const response = await api.get<Student[]>("student/all");
  return response;
};

export const findStudentBySchoolClassCode = async (code: string) => {
  const response = await api.get<Student[]>(`student/class/${code}`);
  return response;
};

export const findStudentBySchoolId = async (id: string) => {
  const response = await api.get<Student[]>(`student/school/${id}`);
  return response;
};

export const studentReport = async (id: string) => {
  const response = await api.get<Report>(`student/report/${id}`);
  return response;
};
