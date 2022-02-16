import React from 'react';
import './App.css';
import { GlobalStyle } from './style';
import { IconStyle } from "./component/common/Icon/iconStyle";
import  { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Router from './router'



function App() {
  const theme = {
      color: 'red'
  }


  return (
      <BrowserRouter>
      <ThemeProvider theme={theme} >
          <div id="App">
              <Router />
              <GlobalStyle />
              <IconStyle />
          </div>
      </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
