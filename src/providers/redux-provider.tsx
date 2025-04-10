"use client";

import * as React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

export function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}
