import React, {useCallback, useEffect, useRef, useState} from "react"
import styled from "styled-components"
import { CSSTransition } from 'react-transition-group'
import { useNavigate, useParams } from "react-router"
import Header from "../../component/common/header";
import { getCount, isEmptyObject } from "../../utils";
import Icon from "../../component/common/icon";
import { connect } from 'react-redux';
import { getAlbumList, changeEnterLoading } from "../../store/album/actionCreators";
import Scroll from "../../component/common/scroll";
import Loading from "../../component/common/loading";
import { HEADER_HEIGHT } from '../../const/staticVariable'
import MusicNote from "../../component/common/music-note";
import SongsList from "../songs-list"

interface ITopDesc {
    backgroundUrl: string;
}

const Album = (props: any) => {
    const [showStatus, setShowStatus] = useState(true)
    const [title, setTitle] = useState("歌单")
    const { currentAlbum: currentAlbumImmutable, enterLoading, getAlbumDataDispatch } = props;
    const { id } = useParams();
    const currentAlbum = currentAlbumImmutable.toJS();
    const headerRef = useRef();
    const musicNoteRef: any = useRef();

    useEffect(() => {
        getAlbumDataDispatch(id);
        setTitle(currentAlbum.name)
    }, [getAlbumDataDispatch, id]);

    const navigate = useNavigate()

    const historyBack = () => {
        navigate(-1)
    }

    const handleBack = () => {
        setShowStatus (false);
    };
  
    const musicAnimation = (x: number, y: number) => {
      musicNoteRef.current.startAnimation({ x, y });
    };
  
    const handleScroll = useCallback((pos) => {
        const minScrollY = -HEADER_HEIGHT;
        const headerCur = headerRef.current as any
        //滑过顶部的高度开始变化
        pos.y < minScrollY ? headerCur.setActive() : headerCur.setDefault()
    }, [currentAlbum]);

    const renderTopDesc = () => {
        return (
            <TopDesc backgroundUrl={currentAlbum.coverImgUrl}>
                <div className="background">
                    <div className="filter" />
                </div>
                <div className="img_wrapper">
                    <div className="decorate"/>
                    <img src={currentAlbum.coverImgUrl} alt="" />
                    <div className="play_count">
                <i className="iconfont play">&#xe885;</i>
                <Icon type={'music'} color={'#xe6e3'} />
                        <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
                    </div>
                </div>
                <div className="desc_wrapper">
                    <div className="title">{currentAlbum.name}</div>
                    <div className="person">
                        <div className="avatar">
                            <img src={currentAlbum.creator.avatarUrl} alt="" />
                        </div>
                        <div className="name">{currentAlbum.creator.nickname}</div>
                    </div>
                </div>
            </TopDesc>
        )
    }

    const renderMenu = () => {
        return (
            <Menu>
                <div>
                    <Icon type={'comment'} color={'#xe6ad'} />
                    评论
                </div>
                <div>
                    <Icon type={'like'} color={'#xe86f'}/>
                    点赞
                </div>
                <div>
                    <Icon type={'star'} color={'#xe62'}/>
                    收藏
                </div>
                <div>
                    <Icon type={'more'} color={'#xe606'}/>
                    更多
                </div>
            </Menu>
        )
    }

    const renderSongList = () => {
      return (
        <SongsList
          songs={currentAlbum.tracks}
          collectCount={currentAlbum.subscribedCount}
          showCollect={true}
          musicAnimation={musicAnimation}
          showBackground={true}
        />
      )
    }

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={historyBack }
        >
            <Container>
                <Header title={title}
                        ref={headerRef}
                        handleClick={handleBack}
                        isMarquee={false} />

                {!isEmptyObject(currentAlbum) ?
                    (
                        <Scroll
                            bounceTop={false}
                            onScroll={handleScroll}>
                            <div>
                                { renderTopDesc() }
                                { renderMenu() }
                                { renderSongList()}
                                <MusicNote ref={musicNoteRef}></MusicNote>
                            </div>
                        </Scroll>
                    )
                    : null
                }
                { enterLoading ? <Loading/> : null}
            </Container>
        </CSSTransition>

    )
}


// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
    currentAlbum: state.getIn (['album', 'currentAlbum']),
    enterLoading: state.getIn (['album', 'enterLoading']),
});
const mapDispatchToProps = (dispatch: any) => {
    return {
        getAlbumDataDispatch (id: string) {
            dispatch (changeEnterLoading (true));
            dispatch (getAlbumList (id));
        },
    }
};

export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Album));


const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${props => props.theme.backgroundColor};
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear{
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit{
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active{
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`

const TopDesc = styled.div<ITopDesc>`
  background-size: 100%;
  padding: 5px 20px 50px 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 275px;
  position: relative;
  .background{
    z-index: -1;
    background: url(${props => props.backgroundUrl}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    .filter{
      position: absolute;
      z-index: 10;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .img_wrapper{
    width: 120px;
    height: 120px;
    position: relative;         
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
    }
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${props => props.theme.fontsizes};
      line-height: 15px;
      color: ${props => props.theme.fontColorLight};
      .play{
        vertical-align: top;
      }
    }
    img{
      width: 120px;
      height: 120px;
      border-radius:3px;
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title{
      max-height: 70px;
      color: ${props => props.theme.fontColorLight};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${props => props.theme.fonsizel};
    }
    .person{
      display: flex;
      .avatar{
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${props => props.theme.fontsizem};
        color: ${props => props.theme.fontColorDesc2};
      }
    }
  }
`;

const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
  margin: -100px 0 0 0;
  >div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    font-size: ${props => props.theme.fontsizes};
    color: ${props => props.theme.fontColorLight};
    z-index:1000;
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`