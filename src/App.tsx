import React from 'react';
import './App.css';
import { GlobalStyle } from './style';
import { IconStyle } from "./component/common/icon/iconStyle";
import  { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Router from './router'
import store from "./store";
import { themeCSS } from "./const/global-style";
import { Provider } from "react-redux";

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <ThemeProvider theme={themeCSS} >
                  <div id="App">
                      <Router />
                      <GlobalStyle />
                      <IconStyle />
                  </div>
              </ThemeProvider>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
