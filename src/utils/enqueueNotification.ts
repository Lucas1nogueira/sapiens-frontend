import { NotificationType } from "@contexts/NotificationContext";

type Notify = (message: string, type?: NotificationType) => void;

let notifyFn: Notify | undefined;
export const setNotify = (fn: Notify) => {
  notifyFn = fn;
};

export const enqueueNotification = (
  message: string,
  type?: NotificationType
) => {
  if (!notifyFn) {
    throw new Error(
      "enqueueNotification must be called after setNotify is called"
    );
  }

  notifyFn(message, type);
};
