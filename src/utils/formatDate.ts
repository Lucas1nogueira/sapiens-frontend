export const formatDateWithHour = (date: string) => {
  const newDate = new Date(date);

  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();
  const hour = newDate.getHours().toString().padStart(2, "0");
  const minutes = newDate.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hour}:${minutes}`;
};

export const formatDate = (date: string) => {
  const newDate = new Date(date);

  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
};
