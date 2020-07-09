export const formatDateStr = (value: string): string => {
  return new Date(value).toLocaleString("ru-RU", {
    month: "short",
    day: "numeric"
  });
};
