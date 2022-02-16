import { createGlobalStyle } from 'styled-components';

export const IconStyle = createGlobalStyle`
  @font-face {
    font-family: "iconfont"; /* Project id 3183231 */
    src: url('//at.alicdn.com/t/font_3183231_1w4m5ywp2tz.woff2?t=1644852062863') format('woff2'),
    url('//at.alicdn.com/t/font_3183231_1w4m5ywp2tz.woff?t=1644852062863') format('woff'),
    url('//at.alicdn.com/t/font_3183231_1w4m5ywp2tz.ttf?t=1644852062863') format('truetype');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-menu:before {
    content: "\\e610";
  }

  .icon-search:before {
    content: "\\e64f";
  }
`

