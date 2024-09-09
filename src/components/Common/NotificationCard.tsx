import { useState, useEffect, useMemo } from "react";
import { NotificationType } from "@contexts/NotificationContext";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/react";

const getIconAndColor = (type: NotificationType) => {
  switch (type) {
    case "success":
      return { icon: "mdi:check-circle", color: "text-green-500" };
    case "error":
      return { icon: "bxs:message-alt-error", color: "text-red-500" };
    default:
      return { icon: "mdi:info-circle", color: "text-blue-500" };
  }
};

type Props = {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose?: () => void;
};

export function NotificationCard({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: Props) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 100);
        if (newProgress <= 0) {
          clearInterval(timer);
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [duration, onClose]);

  const messageNormalized = useMemo(() => {
    if (message.length > 104) return message.slice(0, 104) + "...";
    return message;
  }, [message]);

  return (
    <div className="relative shadow-lg border border-gray-200 bg-white rounded-lg overflow-hidden w-96">
      <div className="flex items-start gap-4 p-4 pr-12">
        <div className="flex justify-center items-center h-14 bg-zinc-100 rounded-md">
          <Icon
            icon={getIconAndColor(type).icon}
            className={`text-2xl ${getIconAndColor(type).color}`}
            width={34}
            height={34}
          />
        </div>
        <div className="flex-1">
          <p className="text-sm mb-2 text-left">{messageNormalized}</p>
        </div>
        {onClose && (
          <Button
            aria-label="Close notification"
            className="absolute top-2 right-2"
            color="danger"
            variant="ghost"
            size="sm"
            isIconOnly
            onClick={onClose}
          >
            <Icon icon="mdi:close" width={22} height={22} />
          </Button>
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-2 bg-blue-300"
        style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
      />
    </div>
  );
}
