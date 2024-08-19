import { Discipline } from "./discipline";

export type Schedule = {
  id: string;
  date: string;
  day: string;
  startAt: string;
  endAt: string;
  discipline: Discipline;
};
