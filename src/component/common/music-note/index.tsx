import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import styled from 'styled-components';
import { prefixStyle } from '../../../utils';

const MusicNote = forwardRef((props: any, ref) => {
  const iconsRef: any = useRef();
  const ICON_NUMBER = 10;
  const transform = prefixStyle("transform");

  const createNode = (txt: string) => {
    const template = `<div class='icon_wrapper'>${txt}</div>`;
    const tempNode = document.createElement('div');
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  }

  useEffect(() => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      const node = createNode(`<i class="iconfont icon-musicNote">&#xe642;</div>`);
      iconsRef.current.appendChild(node);
    }
    const domArray: any[] = [].slice.call(iconsRef.current.children)
    domArray.forEach(item => {
      item.running = false;
      item.addEventListener('transitionend', function () {
        item.style['display'] = 'none';
        item.style[transform as string] = `translate3d(0, 0, 0)`;
        item.running = false;

        const icon = item.querySelector('div');
        icon.style[transform as string] = `translate3d(0, 0, 0)`;
      }, false);
    });
    // eslint-disable-next-line
  }, []);

  const startAnimation = ({ x, y }: { x: number, y: number }) => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      const domArray: any[] = [].slice.call(iconsRef.current.children)
      const item = domArray[i]
      // 选择一个空闲的元素来开始动画
      if (item.running === false) {
        item.style.left = x + "px";
        item.style.top = y + "px";
        item.style.display = "inline-block";
        setTimeout(() => {
          item.running = true;
          item.style[transform as string] = `translate3d(0, 750px, 0)`;
          const icon = item.querySelector("div");
          icon.style[transform as string] = `translate3d(-40px, 0, 0)`;
        }, 20);
        break;
      }
    }
  };

  //外界调用的ref方法
  useImperativeHandle(ref, () => ({
    startAnimation
  }));

  return ( <Container ref={iconsRef} /> )
})

export default React.memo(MusicNote);

const Container = styled.div<{ ref: any }>`
  .icon_wrapper{
    position: fixed;
    z-index: 1000;
    margin-top: -10px;
    margin-left: -10px;
    color: ${props => props.theme.color};
    font-size: 14px;
    display: none;
    transition: transform 1s cubic-bezier(.62,-0.1,.86,.57);
    transform: translate3d(0, 0, 0);
    >div{
      transition: transform 1s;
    }
  }
`