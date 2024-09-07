import { Evaluation } from "types/evaluation";
import { api } from "./api";

export const findAllEvaluations = () => {
  const response = api.get("/evaluation/all");
  return response;
};

export const findEvaluationsByDisciplineCode = (code: string) => {
  const response = api.get(`/evaluation/discipline/${code}`);
  return response;
};

export const findEvaluationsByGradeId = (id: string) => {
  const response = api.get(`/evaluation/grade/${id}`);
  return response;
};

export const saveEvaluation = (evaluation: Evaluation) => {
  const response = api.post("/evaluation/save", evaluation);
  return response;
};

export const updateEvaluation = (evaluation: Evaluation) => {
  const response = api.put("/evaluation/update", evaluation);
  return response;
};

export const deleteEvaluation = (code: string) => {
  const response = api.delete(`/evaluation/delete/${code}`);
  return response;
};

export const findEvaluationById = (id: string) => {
  const response = api.get(`/evaluation/${id}`);
  return response;
};
