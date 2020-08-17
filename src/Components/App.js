import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";

export default () => {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        Hello World
      </>
    </ThemeProvider>
  );
};
