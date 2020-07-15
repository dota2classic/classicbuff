import { EffectCallback, useRef } from "react";

type Callback = EffectCallback | (() => void) | (() => Promise<void>);

export default (func: Callback) => {
  const willMount = useRef(true);

  if (willMount.current) {
    func();
  }

  willMount.current = false;
};
