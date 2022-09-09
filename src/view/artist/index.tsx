import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { CSSTransition } from "react-transition-group";
import Header from "../../component/common/header";
import { connect } from "react-redux"
import { changeEnterLoading, getArtistInfo } from "../../store/artist/actionCreators";
import Loading from "../../component/common/loading";
import SongsList from '../song-list'
import Scroll from "../../component/common/scroll";
import { useParams, useNavigate } from "react-router"
import { HEADER_HEIGHT } from '../../const/staticVariable'

interface IRef {
  ref: any
}

interface IContainer {
  play: number;
}

interface IImgWrapper extends IRef {
  bgUrl: string
}

const Artist = (props: any): JSX.Element => {
  const initialHeight = useRef(0);
  const [showStatus, setShowStatus] = useState(true);
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    artist: immutableArtist,
    songs: immutableSongs,
    loading,
  } = props;

  const { getArtistDataDispatch } = props;

  const historyBack = () => {
    navigate(-1)
  }

  const artist = immutableArtist.toJS();
  const songs = immutableSongs.toJS();

  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const headerRef = useRef();
  let headerDOM:any
  const layer = useRef();

  //往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
    getArtistDataDispatch(id);
    const h: any = (imageWrapper.current as any).offsetHeight;
    initialHeight.current = h;
    (songScrollWrapper.current as any).style.top = `${h - OFFSET}px`;
    //把遮罩先放在下面，以裹住歌曲列表
    (layer.current as any).style.top = `${h - OFFSET}px`;
    (songScroll.current as any).refresh();
    headerDOM = (headerRef.current as any)
    // eslint-disable-next-line
  }, []);

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(pos => {
    const height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = (imageWrapper.current as any);
    const buttonDOM = (collectButton.current as any);

    const layerDOM = (layer.current as any);
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    //指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);

    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      //这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      //按钮跟着移动且渐渐变透明
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      //往上滑动，但是超过Header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      //防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      //此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, [])

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={historyBack}>
      <Container play={props.play}>
        <Header
          ref={headerRef}
          handleClick={setShowStatusFalse}
          title={artist.name} />
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"/>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList
              songs={songs}
              showCollect={false}
              collectCount={0}
              showBackground={false}
            />
          </Scroll>
        </SongListWrapper>
        {loading ? (<Loading></Loading>) : null}
      </Container>
    </CSSTransition>
  )
}


// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  artist: state.getIn(["artist", "artist"]),
  songs: state.getIn(["artist", "songsOfArtist"]),
  loading: state.getIn(["artist", "loading"]),
});

// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getArtistDataDispatch(id: string) {
      dispatch(changeEnterLoading(true));
      dispatch(getArtistInfo(id));
    }
  };
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Artist));

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

const CollectButton = styled.div<IRef>`
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

const SongListWrapper = styled.div<IRef>`
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
const BgLayer = styled.div<IRef>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 50;
`