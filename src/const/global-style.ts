// 主题颜色
const themeCSS: Record<string, string>  = {
    color: '#d44439',
    colorShadow: 'rgba (212, 68, 57, .5)',
    fontColorLight: '#f1f1f1',
    fontColorDesc: '#2E3030',
    fontColorDesc2: '#bba8a8',
    fontsizess: '10px',
    fontsizes: '12px',
    fontsizem: '14px',
    fontsizel: '16px',
    fontsizell: '18px',
    borderColor: '#e4e4e4',
    backgroundColor: '#f2f3f4',
    backgroundColorShadow: 'rgba (0, 0, 0, 0.3)',
    highlightBkColor: '#fff',
}

// 扩大可点击区域
const extendClick = () => {
    return `
    position: relative;
    &:before{
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
}

//一行文字溢出部分用...代替
const noWrap = () => {
    return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

export {
    themeCSS,
    extendClick,
    noWrap
}
