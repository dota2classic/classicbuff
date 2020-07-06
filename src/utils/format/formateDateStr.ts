export const formatDateStr = (value: string): string => {
  return new Date(value).toLocaleString("ru-RU", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};
