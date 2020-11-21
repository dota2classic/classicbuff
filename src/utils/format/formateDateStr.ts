export const formatDateStr = (value: string | number): string => {
  return new Date(value).toLocaleString("ru-RU", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};

export const formatDateFullStr = (value: string | number): string => {
  return new Date(value).toLocaleString("ru-RU", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour12: false
  });
};

export const numericDate = (value: string | number): string => {
  const d = new Date(value);
  return `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
};
