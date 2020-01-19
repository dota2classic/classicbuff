import { throttle as throttleFn } from "throttle-debounce";

export const throttle = (ms: number) =>
  function(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    return {
      configurable: true,
      get(this: any) {
        if (!descriptor.value) return descriptor.value;
        let value = throttleFn(ms, descriptor.value.bind(this));
        Object.defineProperty(this, propertyKey, {
          value,
          configurable: true,
          writable: true
        });
        return value;
      }
    };
  };

export const clearThrottle = (...functions: any[]) => {
  for (const f of functions) {
    if (f && f.cancel && typeof f.cancel === "function") {
      f.cancel();
    } else {
      console.error("Can't clear throttle", f);
    }
  }
};
