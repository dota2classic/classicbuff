export const isNightTime = () => {
  const d = new Date().getHours();
  return d >= 2 && d <= 10;
};
