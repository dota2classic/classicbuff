import { default as React, useEffect } from "react";

export const onDidMount = (action: () => void | Promise<void>) => {
  useEffect(() => {
    action();
  }, []);
};

export const KeyName = {
  ESC: ["Escape", "Esc"]
};

export const handleKeyDown = (key: string | string[] | string[][], handler: (e?: KeyboardEvent) => void) => {
  React.useEffect(() => {
    const keys = typeof key === "string" ? [key] : key.flat();

    const handle = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) {
        handler(e);
      }
    };

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);
};
