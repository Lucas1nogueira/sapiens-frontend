import { Evaluation } from "types/evaluation";
import { api } from "./api";

export const findAllEvaluations = async (): Promise<Evaluation[]> => {
  const response = await api.get("/evaluation/all");
  return response.data;
};

export const findEvaluationsByDisciplineCode = async (
  code: string
): Promise<Evaluation[]> => {
  const response = await api.get(`/evaluation/discipline/${code}`);
  return response.data;
};

export const findEvaluationsByGradeId = async (
  id: string
): Promise<Evaluation[]> => {
  const response = await api.get(`/evaluation/grade/${id}`);
  return response.data;
};

export const saveEvaluation = async (evaluation: Evaluation) => {
  const response = await api.post("/evaluation/save", evaluation);
  return response.data;
};

export const updateEvaluation = async (evaluation: Evaluation) => {
  const response = await api.put("/evaluation/update", evaluation);
  return response.data;
};

export const deleteEvaluation = async (code: string) => {
  const response = await api.delete(`/evaluation/delete/${code}`);
  return response.data;
};

export const findEvaluationById = async (id: string): Promise<Evaluation> => {
  const response = await api.get(`/evaluation/${id}`);
  return response.data;
};
