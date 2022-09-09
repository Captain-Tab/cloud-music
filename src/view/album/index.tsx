import React, {useCallback, useEffect, useRef, useState} from "react"
import styled from "styled-components"
import { CSSTransition } from 'react-transition-group'
import { useNavigate, useParams } from "react-router"
import { noWrap } from '../../const/global-style'
import Header from "../../component/common/header";
import { getCount, getName, isEmptyObject } from "../../utils/common";
import Icon from "../../component/common/icon";
import { connect } from 'react-redux';
import { getAlbumList, changeEnterLoading } from "../../store/album/actionCreators";
import Scroll from "../../component/common/scroll";
import Loading from "../../component/common/loading";
import { HEADER_HEIGHT } from '../../const/staticVariable'

interface ITopDesc {
    backgroundUrl: string;
}

const Album = (props: any) => {
    const [showStatus, setShowStatus] = useState(true)
    const [title, setTitle] = useState("歌单")
    const { currentAlbum: currentAlbumImmutable, enterLoading, getAlbumDataDispatch } = props;
    const { id } = useParams()
    const currentAlbum = currentAlbumImmutable.toJS();
    const headerRef = useRef();

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
            <SongList>
                <div className="first_line">
                    <div className="play_all">
                        <Icon type={'player'} color={'#xe6e3'} />
                        <span>播放全部 <span className="sum">(共{currentAlbum.tracks.length}首)</span></span>
                    </div>
                    <div className="add_list">
                        <Icon type={'plus'} color={'#xe62d'} />
                        <span>收藏({getCount(currentAlbum.subscribedCount)})</span>
                    </div>
                </div>
                <SongItem>
                    {
                        currentAlbum.tracks.map((item: any, index: number) => {
                            return (
                                <li key={index}>
                                    <span className="index">{index + 1}</span>
                                    <div className="info">
                                        <span>{item.name}</span>
                                        <span>{getName(item.ar)} - {item.al.name}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </SongItem>
            </SongList>
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
                            onScroll={handleScroll}
                        >
                            <div>
                                { renderTopDesc() }
                                { renderMenu() }
                                { renderSongList() }
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

const SongList = styled.div`
  border-radius: 10px;
  opacity: 0.98;
  background: ${props => props.theme.highlightBkColor};
  .first_line{
    box-sizing: border-box;
    padding: 10px 0;
    margin-left: 10px;
    position: relative;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    .play_all{
      display: inline-block;
      line-height: 24px;
      color: ${props => props.theme.fontColorDesc};
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      .sum{
        font-size: ${props => props.theme.fontsizes};
        color: ${props => props.theme.fontColorDesc2};
      }
      >span{
        vertical-align: top;
      }
    }
    .add_list,.isCollected {
      display: flex;
      align-items: center;
      position: absolute;
      right: 0;
      top :0; 
      bottom: 0;
      width: 130px;
      line-height: 34px;
      background: ${props => props.theme.color};
      color: ${props => props.theme.fontColorLight};
      font-size: 0;
      border-radius: 3px;
      vertical-align: top;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0 5px 0 10px;
      }
      span{
        font-size: 14px;
        line-height: 34px;
      }
    }
    .isCollected{
      display: flex;
      background: ${props => props.theme.backgroundColor};
      color: ${props => props.theme.fontColorDesc};
    }
}
`

const SongItem = styled.ul`
  >li{
    display: flex;
    height: 60px;
    align-items: center;  
    .index{
      flex-basis: 60px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info{
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${props => props.theme.borderColor};
      ${noWrap()}
      >span{
        ${noWrap()}
      }
      >span:first-child{
        color: ${props => props.theme.fontColorDesc};
      }
      >span:last-child{
        font-size: ${props => props.theme.fontsizes};
        color: #bba8a8;
      }
    }
  }
`
