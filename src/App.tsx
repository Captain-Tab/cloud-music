// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { IconStyle } from './assets/iconfont/iconfont'
import React from 'react';
import './App.css';
import { GlobalStyle } from './style';

function App() {
  return (
      <div className="App">
          <GlobalStyle />
          <IconStyle />
          <i className="iconfont">&#xe62b;</i>
      </div>
  );
}

export default App;
