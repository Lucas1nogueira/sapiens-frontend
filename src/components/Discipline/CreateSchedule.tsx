import { Icon } from "@iconify/react";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  findScheduleByDisciplineCode,
  saveSchedulesForDiscipline,
} from "services/scheduleService";
import { Discipline } from "types/discipline";
import { Schedule } from "types/schedule";
import { enqueueNotification } from "utils/enqueueNotification";

type Props = {
  discipline: Discipline;
};

type ScheduleWithTempId = Schedule & { tempId: string };

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

export function CreateSchedule({ discipline }: Props) {
  const [schedules, setSchedules] = useState<ScheduleWithTempId[]>([]);

  useEffect(() => {
    findScheduleByDisciplineCode(discipline.code)
      .then((response) => {
        const schedulesWithTempId: ScheduleWithTempId[] = response.data.map(
          (schedule) => ({ ...schedule, tempId: crypto.randomUUID() })
        );

        setSchedules(schedulesWithTempId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [discipline.code]);

  const handleDaySelection = (day: string) => {
    const existingSchedules = schedules.filter(
      (schedule) => schedule.day === day
    );

    if (existingSchedules.length > 0) {
      setSchedules(schedules.filter((schedule) => schedule.day !== day));
    } else {
      const newSchedule: ScheduleWithTempId = {
        tempId: crypto.randomUUID(),
        id: null as unknown as string,
        date: null as unknown as string,
        day,
        startAt: "",
        endAt: "",
        discipline,
      };
      setSchedules([...schedules, newSchedule]);
    }
  };

  const handleTimeChange = (
    tempId: string,
    type: "startAt" | "endAt",
    value: string
  ) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.tempId === tempId ? { ...schedule, [type]: value } : schedule
      )
    );
  };

  const addSchedule = (day: string) => {
    const newSchedule: ScheduleWithTempId = {
      tempId: crypto.randomUUID(),
      id: null as unknown as string,
      date: null as unknown as string,
      day,
      startAt: "",
      endAt: "",
      discipline,
    };
    setSchedules([...schedules, newSchedule]);
  };

  const removeSchedule = (tempId: string) => {
    setSchedules(schedules.filter((schedule) => schedule.tempId !== tempId));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const schedulesWithoutTempIds: Schedule[] = schedules.map(
      ({ tempId, ...schedule }) => {
        console.log(`TempId: ${tempId} | Schedule:`, schedule);
        return {
          ...schedule,
          discipline,
        };
      }
    );

    saveSchedulesForDiscipline(discipline.code, schedulesWithoutTempIds)
      .then(() => {
        enqueueNotification("Horários salvos com sucesso!", "success");
        setSchedules([]);
      })
      .catch((error) => {
        enqueueNotification(error.response.data, "error");
      });
  };

  return (
    <div className="max-h-[500px] overflow-y-auto p-4 bg-white">
      <h1 className="text-center text-2xl font-bold mb-4">
        Atribua um Horário a uma Disciplina
      </h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <p className="text-lg">
          <strong>Disciplina: {discipline.name} </strong>
        </p>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-700">Dias da Semana:</label>
          <div className="flex gap-2 flex-wrap">
            {daysOfWeek.map((day) => (
              <Button
                type="button"
                key={day}
                onClick={() => handleDaySelection(day)}
                className={`px-3 py-1 rounded-md border ${
                  schedules.some((schedule) => schedule.day === day)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        {daysOfWeek.map((day) => (
          <div key={day}>
            {schedules
              .filter((schedule) => schedule.day === day)
              .map((schedule) => (
                <div
                  key={schedule.tempId}
                  className="flex flex-col gap-4 p-4 mt-2 bg-gray-100 rounded-md shadow-sm relative"
                >
                  <h2 className="text-lg font-bold text-gray-700">{day}</h2>
                  <Input
                    color="primary"
                    variant="bordered"
                    label="Horário de Início"
                    type="time"
                    value={schedule.startAt}
                    onChange={(e) =>
                      handleTimeChange(
                        schedule.tempId,
                        "startAt",
                        e.target.value
                      )
                    }
                    isRequired
                  />
                  <Input
                    color="primary"
                    variant="bordered"
                    label="Horário de Término"
                    type="time"
                    value={schedule.endAt}
                    onChange={(e) =>
                      handleTimeChange(schedule.tempId, "endAt", e.target.value)
                    }
                    isRequired
                  />
                  <Button
                    color="danger"
                    variant="ghost"
                    onClick={() => removeSchedule(schedule.tempId)}
                    className="absolute top-2 right-2"
                    isIconOnly
                  >
                    <Icon icon="ic:baseline-close" width={26} />
                  </Button>
                </div>
              ))}

            {schedules.some((schedule) => schedule.day === day) && (
              <Button
                color="primary"
                variant="ghost"
                onClick={() => addSchedule(day)}
                className="mt-2"
                isIconOnly
              >
                <Icon icon="ic:baseline-plus" width={26} />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="submit"
          color="primary"
          className="w-full rounded-md mt-4 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Adicionar
        </Button>
      </form>
    </div>
  );
}
