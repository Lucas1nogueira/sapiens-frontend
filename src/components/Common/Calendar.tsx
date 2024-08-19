import { useState } from "react";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

type Event = {
  day: string;
  hour: string;
  title: string;
};

export function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (day: string, hour: string) => {
    const title = prompt("Event title:");
    if (title) {
      setEvents([...events, { day, hour, title }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-8">
        School Schedule Management
      </h1>
      <div className="grid grid-cols-8 gap-4">
        {/* Header with Days of the Week */}
        <div></div>
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}

        {/* Hours and Grid for Events */}
        {hours.map((hour) => (
          <div key={hour}>
            <div className="text-right pr-4 font-semibold">{hour}</div>
            {daysOfWeek.map((day) => (
              <div
                key={day + hour}
                className="border border-gray-300 h-16 relative cursor-pointer"
                onClick={() => addEvent(day, hour)}
              >
                {events
                  .filter((event) => event.day === day && event.hour === hour)
                  .map((event, index) => (
                    <div
                      key={index}
                      className="bg-blue-500 text-white text-sm rounded px-2 py-1 absolute inset-0"
                    >
                      {event.title}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
