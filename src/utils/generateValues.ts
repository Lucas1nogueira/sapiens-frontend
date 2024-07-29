export const generateCode = () => {
  const currYear = new Date().getFullYear();

  return (
    currYear +
    Date.now().toString(36).slice(2, 6) +
    Math.random().toString(36).slice(2, 6)
  ).toUpperCase();
};

export const generatePassword = (): string => {
  return Math.random().toString(36).toLocaleUpperCase().slice(2, 10);
};
