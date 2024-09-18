import { Loading } from "@components/Common/Loading";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { findScheduleByDisciplineCode } from "services/scheduleService";
import { Discipline } from "types/discipline";

type Props = {
  discipline: Discipline;
};

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function DisciplineSchedule({ discipline }: Props) {
  const {
    data: schedulesData,
    isLoading: schedulesLoading,
    error: schedulesError,
  } = useQuery({
    queryKey: ["schedules", discipline.code],
    queryFn: () => findScheduleByDisciplineCode(discipline.code),
  });

  const schedules = useMemo(() => schedulesData || [], [schedulesData]);

  if (schedulesLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loading />
      </div>
    );
  }

  if (schedulesError) {
    return (
      <div className="flex justify-center items-center p-4">
        <p>Erro ao carregar horários.</p>
      </div>
    );
  }

  const getScheduleByDay = (day: string) => {
    return schedules.filter((schedule) => schedule.day === day);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        Horários: {discipline.name}
      </h1>
      <div className="bg-gray-100 grid grid-cols-6 gap-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center font-semibold border-b border-gray-300 py-1"
          >
            {day}
          </div>
        ))}

        {daysOfWeek.map((day) => (
          <div key={day}>
            {getScheduleByDay(day).map((schedule) => (
              <div
                key={schedule.id}
                className="text-center font-semibold border-b border-gray-300 py-1"
              >
                {schedule.startAt} às {schedule.endAt}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
