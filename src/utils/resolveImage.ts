import { PROD_URL } from "config";

export const resolveImage = (s: string) => {
  return `${PROD_URL}/static/${s}`;
};
