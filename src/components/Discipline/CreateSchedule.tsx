import { Button } from "@nextui-org/react";
import { useState } from "react";
import { Discipline } from "types/discipline";

type Props = {
  discipline: Discipline;
};

type Schedule = {
  startTime: string;
  endTime: string;
};

const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

export function CreateSchedule({ discipline }: Props) {
  const [schedules, setSchedules] = useState<Record<string, Schedule>>({});

  const handleDaySelection = (day: string) => {
    if (schedules[day]) {
      const updatedSchedules = { ...schedules };
      delete updatedSchedules[day];
      setSchedules(updatedSchedules);
    } else {
      setSchedules({
        ...schedules,
        [day]: { startTime: "", endTime: "" },
      });
    }
  };

  const handleTimeChange = (
    day: string,
    type: "startTime" | "endTime",
    value: string
  ) => {
    setSchedules({
      ...schedules,
      [day]: {
        ...schedules[day],
        [type]: value,
      },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode processar o `schedules` conforme necessário
    console.log("Horários da disciplina:", schedules);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-4">
        <h1 className="text-center text-2xl font-bold">
          Atribua um Horário a uma Disciplina
        </h1>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <p>
            <strong>Disciplina: {discipline.name} </strong>
          </p>

          <div className="flex flex-col gap-2">
            <label className="font-bold">Dias da Semana:</label>
            <div className="flex gap-2 flex-wrap">
              {daysOfWeek.map((day) => (
                <button
                  type="button"
                  key={day}
                  onClick={() => handleDaySelection(day)}
                  className={`px-3 py-1 rounded-md border ${
                    schedules[day] ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {daysOfWeek.map(
            (day) =>
              schedules[day] && (
                <div key={day} className="flex flex-col gap-4 mt-2">
                  <h2 className="text-lg font-bold">{day}</h2>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold">Horário de Início:</label>
                    <input
                      type="time"
                      value={schedules[day].startTime}
                      onChange={(e) =>
                        handleTimeChange(day, "startTime", e.target.value)
                      }
                      className="p-2 border rounded-md"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-bold">Horário de Término:</label>
                    <input
                      type="time"
                      value={schedules[day].endTime}
                      onChange={(e) =>
                        handleTimeChange(day, "endTime", e.target.value)
                      }
                      className="p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>
              )
          )}

          <Button
            type="submit"
            color="primary"
            className="w-full rounded-md mt-4"
          >
            Adicionar
          </Button>
        </form>
      </div>
    </div>
  );
}
