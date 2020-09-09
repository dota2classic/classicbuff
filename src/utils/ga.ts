export const ga = (...args: any[]) => {
  if (typeof window === "undefined") return;
  (window as any).ga(...args);
};
