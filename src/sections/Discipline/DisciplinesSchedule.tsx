import { Loading } from "@components/Common/Loading";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { findScheduleByDisciplineCode } from "services/scheduleService";
import { Discipline } from "types/discipline";
import { Schedule } from "types/schedule";

type Props = {
  disciplines: Discipline[];
};

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function DisciplinesSchedule({ disciplines }: Props) {
  const [schedules, setSchedules] = useState<Record<string, Schedule[]>>({});
  const [filterValue, setFilterValue] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchSchedules = async () => {
      setIsLoading(true);
      setError(null);

      const updatedSchedules: Record<string, Schedule[]> = {};

      await Promise.all(
        disciplines.map(async (discipline) => {
          const data = await queryClient.fetchQuery({
            queryKey: ["schedules", discipline.code],
            queryFn: () => findScheduleByDisciplineCode(discipline.code),
          });

          updatedSchedules[discipline.code] = data;
        })
      );

      setSchedules(updatedSchedules);
    };

    fetchSchedules()
      .catch(() =>
        setError("Ocorreu um erro ao buscar os horários das disciplinas.")
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [disciplines, queryClient]);

  const getScheduleByDay = (disciplineCode: string, day: string) => {
    return (
      schedules[disciplineCode]?.filter((schedule) => schedule.day === day) ||
      []
    );
  };

  const items = useMemo(() => {
    if (!filterValue) return disciplines;

    return disciplines.filter((discipline) =>
      discipline.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [disciplines, filterValue]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Horários das Disciplinas</h1>
        <Input
          type="text"
          className="w-2/5"
          placeholder="Buscar por disciplina..."
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </CardHeader>
      <CardBody>
        <div className="overflow-x-auto">
          <div className="bg-gray-100 grid grid-cols-7 gap-2 min-w-[760px] md:min-w-full rounded-md">
            <div className="font-semibold border-b border-gray-300 py-1 text-center">
              Disciplinas
            </div>
            {daysOfWeek.map((day) => (
              <div
                key={day + "-header"}
                className="font-semibold border-b border-gray-300 py-1 text-center"
              >
                {day}
              </div>
            ))}

            {items.map((discipline) => (
              <React.Fragment key={`discipline-${discipline.code}`}>
                <div className="font-bold border-b border-gray-300 py-1 text-center">
                  {discipline.name}
                </div>
                {daysOfWeek.map((day) => (
                  <div
                    key={`schedule-${discipline.code}-${day}`}
                    className="border-b border-gray-300 py-1 text-center"
                  >
                    {isLoading ? (
                      <Loading />
                    ) : getScheduleByDay(discipline.code, day).length > 0 ? (
                      getScheduleByDay(discipline.code, day).map((schedule) => (
                        <div key={schedule.id}>
                          {schedule.startAt} às {schedule.endAt}
                        </div>
                      ))
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
