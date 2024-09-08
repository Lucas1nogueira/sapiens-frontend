import {
  FC,
  PropsWithChildren,
  useState,
  createContext,
  useEffect,
} from "react";
import { NotificationCard } from "@components/Common/NotificationCard";

const NOTIFICATION_DURATION = 3000; // 3 seconds

export type NotificationType = "info" | "success" | "error";

type Notification = {
  id: number;
  message: string;
  type?: NotificationType;
};

export interface NotificationContextProps {
  enqueueNotification: (message: string, type?: NotificationType) => void;
}

export const NotificationContext =
  createContext<NotificationContextProps | null>(null);

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] =
    useState<Notification | null>(null);

  const enqueueNotification = (
    message: string,
    type: NotificationType = "info"
  ) => {
    const id = new Date().getTime();
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const dequeueNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setCurrentNotification(null);
  };

  useEffect(() => {
    const shouldShowNextNotification =
      notifications.length > 0 && !currentNotification;

    if (shouldShowNextNotification) {
      const nextNotification = notifications[0];
      setCurrentNotification(nextNotification);

      setTimeout(() => {
        if (nextNotification) dequeueNotification(nextNotification.id);
      }, NOTIFICATION_DURATION);
    }
  }, [notifications, currentNotification]);

  return (
    <NotificationContext.Provider value={{ enqueueNotification }}>
      {children}
      <div className="fixed top-5 right-5 z-50" style={{ zIndex: 9999 }}>
        {currentNotification && (
          <NotificationCard
            message={currentNotification.message}
            type={currentNotification.type}
            duration={NOTIFICATION_DURATION}
            onClose={() => dequeueNotification(currentNotification.id)}
          />
        )}
      </div>
    </NotificationContext.Provider>
  );
};
