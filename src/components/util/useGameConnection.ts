import { useEffect } from "react";
import { useStores } from "../../stores";

export const useGameConnection = () => {
  const { game } = useStores();
  useEffect(() => {
    if (typeof window !== "undefined") {
      game.connect();
    }
  }, []);
};
