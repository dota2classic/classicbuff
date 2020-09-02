export const formatDateStr = (value: string | number): string => {
  return new Date(Number(value) + 1000 * 60 * 60 * 3).toLocaleString("ru-RU", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};
