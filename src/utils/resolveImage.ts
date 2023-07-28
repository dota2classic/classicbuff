import { isDev } from "../stores/Game";
import { PROD_URL } from "config";

export const resolveImage = (s: string) => {
  return isDev ? `http://localhost:6001/static/${s}` : `${PROD_URL}/static/${s}`;
};
