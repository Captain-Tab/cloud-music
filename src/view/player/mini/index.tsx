import React, { useEffect, useRef } from 'react';
import { getName } from '../../../utils';
import styled, { keyframes } from 'styled-components';
import { noWrap } from '../../../const/global-style'
import ProgressCircle from '../../../component/common/progress-circle';
import { CSSTransition } from 'react-transition-group';
import Icon from '../../../component/common/icon'

interface ISong {
  al: any,
  name: string,
  ar: any[]
}

interface IProps {
  song: ISong ,
  fullScreen: boolean,
  playing: boolean,
  percent: number,
  toggleFullScreen: (fullScreen: boolean) => any,
  clickPlaying: (e: React.MouseEvent<HTMLElement, MouseEvent>, playing: boolean) => any
}

const MiniPlayer = (props: IProps) => {
  console.log('song', props)
  const { song, fullScreen, playing, percent, toggleFullScreen, clickPlaying } = props;

  const miniPlayerRef: any = useRef()

  useEffect(() => {
    console.log('nice')
  })

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}>
      <MiniPlayerContainer ref={miniPlayerRef} onClick={() => toggleFullScreen(true)}>
        <div className="icon">
          <div className="imgWrapper">
            <img className={`play ${playing ? "" : "pause"}`} src={song.al.picUrl} width="40" height="40" alt="img" />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={30} percent={percent}>
            {playing ?
              <Icon
                type={'pause'}
                color={'#xe650'}
                className={'icon-mini'}
                onClick={e => clickPlaying(e, false)} />
              :
              <Icon 
                type={'play'} 
                color={'#xe61e'}
                className={'icon-mini'}
                onClick={e => clickPlaying(e, true)} 
                />
            }
          </ProgressCircle>
        </div>
        <div className="control">
          <Icon type={'musicList'} className={"iconfont"} color={'#xe640'} />
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
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

const MiniPlayerContainer = styled.div<{ ref: any }>`
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
    transition: all .4s;
  }
  .icon{
    flex: 0 0 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .imgWrapper{
      width: 100%;
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
      font-size: 14px;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play{
        left: 9px;
      }
    }
  }
`