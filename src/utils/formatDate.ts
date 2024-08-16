export const formatDateWithHour = (date: string) => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hourAndMinutes = `${newDate.getHours()}:${newDate.getMinutes()}`;

  return `${day}/${month}/${year} ${hourAndMinutes}`;
};

export const formatDate = (date: string) => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
};
