import { Student } from "types/student";
import { api } from "./api";
import { Report } from "types/report";

export const saveStudent = async (student: Student) => {
  const response = await api.post<Student>("student/save", student);
  return response.data;
};

export const updateStudent = async (student: Student) => {
  const response = await api.put<Student>("student/update", student);
  return response.data;
};

export const findStudentByMatriculation = async (matriculation: string) => {
  const response = await api.get<Student>(
    `student/matriculation/${matriculation}`
  );
  return response.data;
};

export const findStudentByEmail = async (email: string) => {
  const response = await api.get<Student>(`student/email/${email}`);
  return response.data;
};

export const findAllStudents = async () => {
  const response = await api.get<Student[]>("student/all");
  return response.data;
};

export const findStudentBySchoolClassCode = async (
  code: string
): Promise<Student[]> => {
  const response = await api.get<Student[]>(`student/class/${code}`);
  return response.data;
};

export const findStudentBySchoolId = async (id: string): Promise<Student[]> => {
  const response = await api.get<Student[]>(`student/school/${id}`);
  return response.data;
};

export const studentReport = async (id: string) => {
  const response = await api.get<Report>(`student/report/${id}`);
  return response.data;
};
