import React from 'react';
import { getName } from '../../../utils/common';
import styled, { keyframes } from 'styled-components';
import { noWrap } from '../../../const/global-style'


interface IProps {
  al: any,
  name: string,
  ar: any[]
}

const MiniPlayer = (props: IProps) => {
  const { al, name, ar } = props

  return (
    <MiniPlayerContainer>
      <div className="icon">
        <div className="imgWrapper">
          <img className="play" src={al.picUrl} width="40" height="40" alt="img" />
        </div>
      </div>
      <div className="text">
        <h2 className="name">{name}</h2>
        <p className="desc">{getName(ar)}</p>
      </div>
      <div className="control">
        <i className="iconfont">&#xe650;</i>
      </div>
      <div className="control">
        <i className="iconfont">&#xe640;</i>
      </div>
    </MiniPlayerContainer>
  )
}

export default React.memo(MiniPlayer)

const rotate = keyframes`
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
`

const MiniPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 60px;
  background: ${props => props.theme.highlightBkColor};
  &.mini-enter{
    transform: translate3d(0, 100%, 0);
  }
  &.mini-enter-active{
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
  }
  &.mini-exit-active{
    transform: translate3d(0, 100%, 0);
    transition: all .4s
  }
  .icon{
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .imgWrapper{
      width: 100%;
      height: 100%;
      img{
        border-radius: 50%;
        &.play{
          animation: ${rotate} 10s infinite;
          &.pause{
            animation-play-state: paused;
          }
        }
      }
    }
  }
  .text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name{
      margin-bottom: 2px;
      font-size: ${props => props.theme.fontsizem};
      color: ${props => props.theme.fontColorDesc};
      ${noWrap()}
    }
    .desc {
      font-size: ${props => props.theme.fontsizes};
      color: ${props => props.theme.fontColorDesc2};
      ${noWrap()}
    }
  }
  .control{
    flex: 0 0 30px;
    padding: 0 10px;
    .iconfont, .icon-playlist{
      font-size: 30px;
      color: ${props => props.theme.color};
    }
    .icon-mini{
      font-size: 16px;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play{
        left: 9px
      }
    }
  }
`