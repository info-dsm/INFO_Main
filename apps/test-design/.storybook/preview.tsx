import React from "react";
import { ThemeProvider } from "styled-components";
import { CustomThemeProvider } from "ui";
export const decorators = [
  (Story) => (
    <CustomThemeProvider>
      <Story />
    </CustomThemeProvider>
  ),
];
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
