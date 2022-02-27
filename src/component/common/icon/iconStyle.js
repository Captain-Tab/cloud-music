import { createGlobalStyle } from 'styled-components';

export const IconStyle = createGlobalStyle`
  @font-face {
    font-family: "iconfont"; /* Project id 3183231 */
    src: url('//at.alicdn.com/t/font_3183231_n81q1viyfdt.woff2?t=1645970236320') format('woff2'),
    url('//at.alicdn.com/t/font_3183231_n81q1viyfdt.woff?t=1645970236320') format('woff'),
    url('//at.alicdn.com/t/font_3183231_n81q1viyfdt.ttf?t=1645970236320') format('truetype');
  }

  .iconfont {
    font-family: "iconfont", serif !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-back:before {
    content: "\\e60a";
  }

  .icon-menu:before {
    content: "\\e610";
  }

  .icon-search:before {
    content: "\\e64f";
  }

`

