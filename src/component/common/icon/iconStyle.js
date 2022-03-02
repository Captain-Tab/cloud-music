import { createGlobalStyle } from 'styled-components';

export const IconStyle = createGlobalStyle`
  @font-face {
    font-family: "iconfont"; /* Project id 3183231 */
    src: url('//at.alicdn.com/t/font_3183231_pbnv2qsyrmh.woff2?t=1646207564904') format('woff2'),
    url('//at.alicdn.com/t/font_3183231_pbnv2qsyrmh.woff?t=1646207564904') format('woff'),
    url('//at.alicdn.com/t/font_3183231_pbnv2qsyrmh.ttf?t=1646207564904') format('truetype');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-plus:before {
    content: "\\e605";
  }

  .icon-player:before {
    content: "\\e615";
  }

  .icon-like:before {
    content: "\\e71d";
  }

  .icon-comment:before {
    content: "\\e816";
  }

  .icon-more:before {
    content: "\\e609";
  }

  .icon-star:before {
    content: "\\e73c";
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

