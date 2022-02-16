import React from 'react';
import './App.css';
import { GlobalStyle } from './style';
import { IconStyle } from "./component/common/Icon/iconStyle";
import styled, {ThemeProvider} from "styled-components";

function App() {
  const theme = {
      color: 'red'
  }

  return (
      <ThemeProvider theme={theme} >
          <div id="App">
              <GlobalStyle />
              <IconStyle />
          </div>
      </ThemeProvider>
  );
}

export default App;
