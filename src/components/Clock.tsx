import { useState, useEffect } from "preact/hooks";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const dateString = time.toLocaleDateString("fr-FR", dateOptions);
  const timeString = time.toLocaleTimeString("fr-FR", timeOptions);
  const hour = time.getHours();
  const isNight = hour >= 22 || hour < 6;

  return (
    <div
      class={`p-4 rounded-2xl shadow-md text-center backdrop-blur-md transition-colors duration-500 ${
        isNight ? "bg-blue-900/70 text-white" : "bg-white/70 text-gray-800"
      }`}
    >
      {isNight ? (
        <>
          <p class="text-2xl font-semibold flex items-center justify-center gap-2">
            <i class="fa-solid fa-bed"></i> Zzzz...
          </p>
        </>
      ) : (
        <>
        <div class="flex flex-col items-center">
            <span class="text-sm font-light capitalize">{dateString}</span>
            <span class="text-2xl font-semibold">{timeString}</span>
        </div>
        </>
      )}
    </div>
  );
}
