import { createGlobalStyle } from 'styled-components';

export const IconStyle = createGlobalStyle`
@font-face {
  font-family: "iconfont"; /* Project id 3183231 */
  src: url('//at.alicdn.com/t/c/font_3183231_88w8deg5e25.woff2?t=1663052983723') format('woff2'),
       url('//at.alicdn.com/t/c/font_3183231_88w8deg5e25.woff?t=1663052983723') format('woff'),
       url('//at.alicdn.com/t/c/font_3183231_88w8deg5e25.ttf?t=1663052983723') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-musicNote:before {
  content: "\\ea29";
}

.icon-unfold:before {
  content: "\\e62d";
}

.icon-list:before {
  content: "\\e607";
}

.icon-play:before {
  content: "\\e6fd";
}

.icon-loop:before {
  content: "\\e8f0";
}

.icon-repeat-one-line:before {
  content: "\\e6de";
}

.icon-infinite:before {
  content: "\\e70c";
}

.icon-shuffle:before {
  content: "\\e7ee";
}

.icon-next:before {
  content: "\\e60b";
}

.icon-previous:before {
  content: "\\e818";
}

.icon-pauseCircle:before {
  content: "\\e62a";
}

.icon-playCircle:before {
  content: "\\e633";
}

.icon-pause:before {
  content: "\\e7fe";
}

.icon-musicList:before {
  content: "\\e699";
}

.icon-earPhone:before {
  content: "\\e817";
}

.icon-plus:before {
  content: "\\e605";
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