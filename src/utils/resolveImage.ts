import { isDev } from "../stores/Game";

export const resolveImage = (s: string) => {
  return isDev ? `http://localhost:6001/static/${s}` : `https://dota2classic.ru/api/static/${s}`;
};
