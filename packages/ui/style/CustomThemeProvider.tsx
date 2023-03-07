import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./globalstyle";
import { theme } from "./theme";
import React, { ReactNode } from "react";
export interface ChildProps {
  children: ReactNode;
}
export const CustomThemeProvider = ({ children }: ChildProps) => {
  return (
    <>
      <ThemeProvider {...{ theme }}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
};
