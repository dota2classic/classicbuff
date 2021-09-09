export const ga = (...args: string[]) => {
  if (typeof window === "undefined") return;
  (window as any).ga(...args);
};
export const gtag = (...args: string[]) => {
  if (typeof window === "undefined") return;
  (window as any).gtag(...args);
};
export const downloadEvent = () => gtag("event", "download");
export const loginEvent = () => gtag("event", "steam_login");
