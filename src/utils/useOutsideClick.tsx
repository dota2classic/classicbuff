import * as React from "react";
import { useCallback, useEffect } from "react";

export const eventIncludes = (element: any, e: any) => {
  try {
    return element && e.composedPath().includes(element);
  } catch (exc) {
    // safari fallback
    return element && !element.contains(e.target as Node);
  }
};

export default function useOutsideClick(onClickOut: () => void, ref: any) {
  console.log("useOutsideClick");
  useEffect(() => {
    const onClick = (e: any) => {
      if (!ref.current || e.nasty) return false;
      return !ref.current?.contains(e.target) && onClickOut?.();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

// export default function useOutsideClick(onOuterClick: (e: any) => void, innerRef: React.RefObject<any>) {
//   useEffect(
//     () => {
//       if (innerRef.current) {
//         // add listener only, if element exists
//         document.addEventListener("click", handleClick);
//         // unmount previous listener first
//         return () => document.removeEventListener("click", handleClick);
//       }
//
//       function handleClick(e: any) {
//         console.log(e.composedPath().includes(innerRef.current), innerRef.current, e.composedPath())
//         if (!eventIncludes(innerRef.current, e)) {
//           console.log("igger", e)
//           onOuterClick(e);
//         }
//       }
//     },
//     [onOuterClick, innerRef] // invoke again, if deps have changed
//   );
// }

export const useEscapePress = (callback: () => void) => {
  const escFunction = useCallback((event: any) => {
    if (event.keyCode === 27) {
      //Do whatever when esc is pressed
      callback();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
};
