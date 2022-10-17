import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from "styled-components";
import { noWrap } from '../../../const/global-style'
import { getName, formatPlayTime, prefixStyle } from "../../../utils"
import animations from "create-keyframe-animation"
import { CSSTransition } from "react-transition-group"
import ProgressBar from '../../../component/common/progress-bar'
import { playMode } from '../../../const/staticVariable';
import Icon from '../../../component/common/icon'
import Scroll from '../../../component/common/scroll';

interface ISong {
  al: any,
  name: string,
  ar: any[]
}

interface IProps {
  song: ISong,
  fullScreen: boolean,
  playing: boolean,
  percent: number,
  mode: number,
  toggleFullScreen: (fullScreen: boolean) => any,
  clickPlaying: (e: React.MouseEvent<HTMLElement, MouseEvent>, playing: boolean) => any,
  currentTime: number,
  duration: number,
  changeMode: () => any,
  handlePrev: () => any,
  handleNext: () => any,
  onProgressChange: (percent: number) => any,
  togglePlayList: (toogle: boolean) => any,
  currentLineNum: number,
  currentPlayingLyric: any,
  currentLyric: any
}

const NormalPlayer = (props: IProps) => {
  const {
    fullScreen,
    song,
    mode,
    playing,
    percent,
    currentTime,
    duration,
    currentLineNum,
    currentPlayingLyric,
    currentLyric,
    changeMode,
    handlePrev,
    handleNext,
    onProgressChange,
    clickPlaying,
    toggleFullScreen,
    togglePlayList
  } = props;

  const normalPlayerRef: any = useRef();
  const cdWrapperRef: any = useRef();
  const currentState = useRef("");
  const lyricScrollRef = useRef();
  const lyricLineRefs: any = useRef([]);

  const transform = prefixStyle("transform");
  
  useEffect(() => {
    if (!lyricScrollRef.current) return;
    const bScroll = (lyricScrollRef.current as any).getBScroll()
    if (currentLineNum > 5) {
      // 保持当前歌词在第5条的位置
      const lineEl = (lyricLineRefs.current[currentLineNum - 5] as any).current;
      bScroll.scrollToElement(lineEl, 1000)
      console.log('end')
    } else {
      // 当前歌词行数<=5, 直接滚动到最顶端
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLineNum]);

  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale
    };
  };

  const enter = () => {
    normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale();//获取miniPlayer图片中心相对normalPlayer唱片中心的偏移
    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    });
    animations.runAnimation(cdWrapperRef.current, "move");
  };

  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation("move");
    cdWrapperDom.style.animation = "";
  };

  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "all 0.4s";
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[transform as string] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  };

  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style[transform as string] = "";
    normalPlayerRef.current.style.display = "none";
    currentState.current = ""
  };

  const getPlayMode = (): string => {
    let iconName;
    if (mode === playMode.sequence) {
      iconName = 'loop';
    } else if (mode === playMode.loop) {
      iconName = 'infinite';
    } else {
      iconName = 'shuffle';
    }
    return iconName;
  };

  const toggleCurrentState = () => {
    if (currentState.current !== "lyric") {
      currentState.current = "lyric";
    } else {
      currentState.current = "";
    }
  };

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}>
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <Icon type={'unfold'} color={'#xe662'} />
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef} onClick={toggleCurrentState}>
          <CSSTransition
            timeout={400}
            classNames="fade"
            in={currentState.current !== "lyric"}
          >
            <CDWrapper style={{ visibility: currentState.current !== "lyric" ? "visible" : "hidden" }}>
              <div className="cd">
                <img
                  className={`image play ${playing ? "" : "pause"}`}
                  src={song.al.picUrl + "?param=400x400"}
                  alt=""
                />
              </div>
              <p className="playing_lyric">{currentPlayingLyric}</p>
            </CDWrapper>
          </CSSTransition>
          <CSSTransition
            timeout={400}
            classNames="fade"
            in={currentState.current === "lyric"}>
            <LyricContainer>
              <Scroll ref={lyricScrollRef}>
                <LyricWrapper
                  style={{ visibility: currentState.current === "lyric" ? "visible" : "hidden" }}
                  className="lyric_wrapper">
                  {
                    currentLyric
                      ? currentLyric.lines.map((item: any, index: number) => {
                        lyricLineRefs.current[index] = React.createRef();
                        return (
                          <p
                            className={`text ${currentLineNum === index ? "current" : "" }`}
                            key={item + index}
                            ref={lyricLineRefs.current[index]}>
                            {item.txt}
                          </p>
                        );
                      })
                      : <p className="text pure">纯音乐，请欣赏。</p>}
                </LyricWrapper>
              </Scroll>
            </LyricContainer>
          </CSSTransition>
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={percent}
                percentChange={onProgressChange}
              />
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left" onClick={changeMode}>  
              <Icon type={getPlayMode()} color={'#xe6e1'} />
            </div>
            <div className="icon i-left" onClick={handlePrev}>
              <Icon type={'previous'} color={'#xe6e1'} />
            </div>
            <div className="icon i-center">
              {
                playing ?
                  <Icon type={'pauseCircle'}
                        color={'#xe723'}
                        onClick={e => clickPlaying(e, !playing)} /> :
                  <Icon type={'playCircle'}
                        color={'#xe731'}
                        onClick={e => clickPlaying(e, !playing)} />
              }
            </div>
            <div className="icon i-right" onClick={handleNext}>
              <Icon type={'next'} color={'#xe718'} />
            </div>
            <div className="icon i-right" onClick={() => togglePlayList(true)}>
              <Icon type={'musicList'} color={'#xe640'} />
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(NormalPlayer);

const rotate = keyframes`
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
`;

const NormalPlayerContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: ${props => props.theme.backgroundColor};
  &.normal-enter,
  &.normal-exit-done {
    .top {
      transform: translate3d(0, -100px, 0);
    }
    .bottom {
      transform: translate3d(0, 100px, 0);
    }
  }
  &.normal-enter-active,
  &.normal-exit-active {
    .top,
    .bottom {
      transform: translate3d(0, 0, 0);
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
    opacity: 1;
    transition: all 0.4s;
  }
  &.normal-exit-active {
    opacity: 0;
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
    &.layer {
      background: ${props => props.theme.fontColorDesc};
      opacity: 0.3;
      filter: none;
    }
  }
`;

const Top = styled.div`
  position: relative;
  margin-bottom: 25px;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .iconfont {
      display: block;
      padding: 9px;
      font-size: 24px;
      color: ${props => props.theme.fontColorDesc};
      font-weight: bold;
    }
  }
  .title {
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    font-size: ${props => props.theme.fontsizel};
    color: ${props => props.theme.fontColorDesc};
    ${noWrap()};
  }
  .subtitle {
    line-height: 20px;
    text-align: center;
    font-size: ${props => props.theme.fontsizem};
    color: ${props => props.theme.fontColorDesc2};
    ${noWrap()};
  }
`;

const Middle = styled.div`
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
  overflow: hidden;
`;

const CDWrapper = styled.div`
  position: absolute;
  margin: auto;
  top: 10%;
  left: 0;
  right: 0;
  width: 80%;
  box-sizing: border-box;
  height: 80vw;
  .cd {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    .image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid rgba(255, 255, 255, 0.1);
    }
    .play {
      animation: ${rotate} 20s linear infinite;
      &.pause {
        animation-play-state: paused;
      }
    }
  }
  .playing_lyric {
    margin-top: 20px;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
`;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0px auto;
  padding: 10px 0;
  .time {
    color: ${props => props.theme.fontColorDesc};
    font-size: ${props => props.theme.fontsizes};
    flex: 0 0 30px;
    line-height: 30px;
    width: 30px;
    &.time-l {
      text-align: left;
    }
    &.time-r {
      text-align: right;
    }
  }
  .progress-bar-wrapper {
    flex: 1;
  }
`;

const Operators = styled.div`
  display: flex;
  align-items: center;
  .icon {
    font-weight: 300;
    flex: 1;
    color: ${props => props.theme.fontColorDesc};
    &.disable {
      color: ${props => props.theme.colorShadow};
    }
    i {
      font-weight: 300;
      font-size: 30px;
    }
  }
  .i-left {
    text-align: right;
  }
  .i-center {
    padding: 0 20px;
    text-align: center;
    i {
      font-size: 40px;
    }
  }
  .i-right {
    text-align: left;
  }
  .icon-favorite {
    color: ${props => props.theme.color};
  }
`;

const LyricContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const LyricWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  p {
    line-height: 32px;
    color: rgba(255, 255, 255, 0.5);
    white-space: normal;
    font-size: ${props => props.theme.fontsizel};
    &.current {
      color: #fff;
    }
    &.pure{
      position: relative;
      top: 30vh;
    }
  }
`;