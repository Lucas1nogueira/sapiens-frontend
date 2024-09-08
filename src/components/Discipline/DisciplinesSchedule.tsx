import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
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

  useEffect(() => {
    disciplines.forEach((discipline) => {
      findScheduleByDisciplineCode(discipline.code)
        .then((response) => {
          setSchedules((prevSchedules) => ({
            ...prevSchedules,
            [discipline.code]: response.data,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [disciplines]);

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
                    {getScheduleByDay(discipline.code, day).length > 0 ? (
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
