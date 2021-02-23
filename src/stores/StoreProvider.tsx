import { initializeStore, RootStore } from "./index";
import React, { PropsWithChildren, ReactNode } from "react";
import { Provider } from "mobx-react";

interface Props {
  hydrationData?: Partial<RootStore>;
  token?: string;
}
export function RootStoreProvider({ children, token, hydrationData }: PropsWithChildren<Props>) {
  // create the store
  const store = initializeStore(hydrationData);

  if (token) store.auth.setToken(token);

  return <Provider {...store}>{children}</Provider>;
}
