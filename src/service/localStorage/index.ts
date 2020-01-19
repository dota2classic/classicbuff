export class LocalStorage {
  static getItem(key: string): string | null {
    if (typeof localStorage === "undefined") return null;

    return localStorage.getItem(key);
  }

  static setItem(key: string, value: string): void {
    if (typeof localStorage === "undefined") return;

    localStorage.setItem(key, value);
  }

  static removeItem(key: string): void {
    if (typeof localStorage === "undefined") return;

    localStorage.removeItem(key);
  }
}
