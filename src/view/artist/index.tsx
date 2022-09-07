import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { CSSTransition } from "react-transition-group";
import Header from "../../component/common/header";


interface IContainer {
  play: number;
}

interface IImgWrapper {
  bgUrl: string;
}

const artist = {
  picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
  name: "薛之谦",
  hotSongs: [
    {
      name: "我好像在哪见过你",
      ar: [{ name: "薛之谦" }],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{ name: "薛之谦" }],
      al: {
        name: "薛之谦专辑"
      }
    },
    // 省略 20 条
  ]
}

const Artist = (props: any): JSX.Element => {
  const [showStatus, setShowStatus] = useState(true);

  const test = () => {
    console.log('gp')
  }
  

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container play={props.play} >
        <Header title={"头部"} handleClick={test} isMarquee={false} />
        <ImgWrapper bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer></BgLayer>
        <SongListWrapper>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}


export default Artist

const Container = styled.div<IContainer>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${props => props.play > 0 ? "60px" : 0};
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ (0deg) translate3d (0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ (30deg) translate3d (100%, 0, 0);
  }
`
const ImgWrapper = styled.div<IImgWrapper>`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  transform-origin: top;
  background: url(${props => props.bgUrl});
  background-size: cover;
  z-index: 50;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba (7, 17, 27, 0.3);
  }
`

const CollectButton = styled.div`
  position: absolute;
  left: 0; right: 0;
  margin: auto;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  margin-top: -55px;
  z-index:50;
  background: ${props => props.theme.color};
  color: ${props => props.theme.fontColorLight};
  border-radius: 20px;
  text-align: center;
  font-size: 0;
  line-height: 40px;
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size:14px;
    letter-spacing: 5px;
  }
`

const SongListWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  >div {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`
const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 50;
`