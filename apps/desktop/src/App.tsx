import React from "react";
import MainRouter from "./routes/router";
import { CustomThemeProvider } from "ui";
function App() {
  return (
    <>
      <CustomThemeProvider>
        <MainRouter />
      </CustomThemeProvider>
    </>
  );
}

export default App;
