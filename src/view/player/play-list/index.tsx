import styled from 'styled-components';
import { extendClick, noWrap } from '../../../const/global-style'; 
import { connect } from "react-redux";
import { CSSTransition } from 'react-transition-group';
import React, { useRef, useState, useCallback } from 'react';
import { prefixStyle, getName, shuffle, findIndex } from './../../../utils';
import {
  changeShowPlayList,
  changeCurrentIndex,
  changePlayMode,
  changePlayList,
  deleteSong,
  changeSequencePlayList,
  changeCurrentSong,
  changePlayingState,
  changeFullScreen
} from "../../../store/player/actionCreators";
import { playMode } from "../../../const/staticVariable"
import Scroll from '../../../component/common/scroll';
import Confirm from '../../../component/common/confirm';
import Icon from '../../../component/common/icon';

interface IProps {
  currentIndex: number,
  currentSong: any,
  showPlayList: any,
  playList: any,
  mode: any,
  sequencePlayList: any,
  togglePlayListDispatch: any,
  changeCurrentIndexDispatch: any,
  changePlayListDispatch: any,
  changeModeDispatch: any,
  deleteSongDispatch: any,
  clearDispatch: any
}

const PlayList = (props: IProps): JSX.Element => {
  const [canTouch, setCanTouch] = useState(true);
  // touchStart后记录y值
  const [startY, setStartY] = useState(0);
  // touchStart事件是否已经被触发
  const [initialed, setInitialed] = useState(false);
  // 用户下滑的距离
  const [distance, setDistance] = useState(0);

  const {
    currentIndex,
    currentSong: immutableCurrentSong,
    showPlayList,
    playList: immutablePlayList,
    mode,
    sequencePlayList: immutableSequencePlayList,
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changePlayListDispatch,
    changeModeDispatch,
    deleteSongDispatch,
    clearDispatch
  } = props;

  const currentSong = immutableCurrentSong.toJS();
  const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();

  const listContentRef: any = useRef();
  const confirmRef: any = useRef();
  const playListRef: any = useRef();
  const listWrapperRef: any = useRef();
  const [isShow, setIsShow] = useState(false);
  const transform = prefixStyle("transform");

  const onEnterCB = useCallback(() => {
    //让列表显示
    setIsShow(true);
    //最开始是隐藏在下面
    listWrapperRef.current.style["transform"] = `translate3d(0, 100%, 0)`;
  }, [transform]);

  const onEnteringCB = useCallback(() => {
    //让列表展现
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style["transform"] = `translate3d(0, 0, 0)`;
  }, [transform]);

  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style["transform"] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  const onExitedCB = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style["transform"] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  const getCurrentIcon = (item: any) => {
    //是不是当前正在播放的歌曲
    const current = currentSong.id === item.id;
    const className = current ? 'icon-play' : '';
    const content = current ? '&#xe6e3;' : '';
    return (
      <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{ __html: content }}></i>
    )
  };

  const getPlayMode = () => {
    let iconName, text;
    if (mode === playMode.sequence) {
      iconName = 'loop';
      text = "顺序播放";
    } else if (mode === playMode.loop) {
      iconName = 'infinite';
      text = '循环播放';
    } else {
      iconName = 'shuffle';
      text = "随机播放";
    }
    return (
      <div>
        <Icon type={iconName}
          color={'#xe6e1'} 
          onClick={() => changeMode()} />
        <span className="text"
          onClick={() => changeMode()}>
          {text}
        </span>
      </div>
    )
  };

  const changeMode = () => {
    const newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      changePlayListDispatch(sequencePlayList);
      const index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
    } else if (newMode === 1) {
      //单曲循环
      changePlayListDispatch(sequencePlayList);
    } else if (newMode === 2) {
      //随机播放
      const newList = shuffle(sequencePlayList);
      const index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
    }
    changeModeDispatch(newMode);
  };

  const handleChangeCurrentIndex = (index: number) => {
    if (currentIndex === index) return;
    changeCurrentIndexDispatch(index);
  };

  const handleDeleteSong = (e: any, song: any) => {
    e.stopPropagation();
    deleteSongDispatch(song);
  };

  const handleShowClear = () => {
    confirmRef.current.show();
  };

  const handleConfirmClear = () => {
    clearDispatch();
  };

  const handleScroll = (pos: { x: number, y: number }) => {
    //只有当内容偏移量为0的时候才能下滑关闭PlayList。否则一边内容在移动，一边列表在移动，出现bug
    setCanTouch(pos.y === 0);
  };

  const handleTouchStart = (e: any) => {
    if (!canTouch || initialed) return;
    listWrapperRef.current.style["transition"] = "";
    setStartY(e.nativeEvent.touches[0].pageY);//记录y值
    setInitialed(true);
  };

  const handleTouchMove = (e: any) => {
    if (!canTouch || !initialed) return;
    const distance = e.nativeEvent.touches[0].pageY - startY;
    if (distance < 0) return;
    setDistance(distance);//记录下滑距离
    listWrapperRef.current.style.transform = `translate3d(0, ${distance}px, 0)`;
  };

  const handleTouchEnd = () => {
    setInitialed(false);
    //这里设置阈值为150px
    if (distance >= 150) {
      //大于150px则关闭PlayList
      togglePlayListDispatch(false);
    } else {
      //否则反弹回去
      listWrapperRef.current.style["transition"] = "all 0.3s";
      listWrapperRef.current.style["transform"] = `translate3d(0px, 0px, 0px)`;
    }
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}>
      <PlayListWrapper
        ref={playListRef}
        style={isShow === true ? { display: "block" } : { display: "none" }}
        onClick={() => togglePlayListDispatch(false)}>
        <div
          className="list_wrapper"
          ref={listWrapperRef}
          onClick={e => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <ListHeader>
            <h1 className="title">
              {getPlayMode()}
              <Icon type={'clear'} onClick={handleShowClear} color={'#xe63d'} />
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll
              ref={listContentRef}
              onScroll={handleScroll}
              bounceTop={false}>
              <ListContent>
                {
                  playList.map((item: any, index: number) => {
                    return (
                      <li className="item" key={item.id} onClick={() => handleChangeCurrentIndex(index)}>
                        { getCurrentIcon(item) }
                        <span className="text">{item.name} - {getName(item.ar)}</span>
                        <span className="like">
                          <i className="iconfont">&#xe601;</i>
                        </span>
                        <span className="delete" onClick={(e) => handleDeleteSong(e, item)}>
                          <i className="iconfont">&#xe63d;</i>
                        </span>
                      </li>
                    )
                  })
                }
              </ListContent>
            </Scroll>
          </ScrollWrapper>
          <Confirm
            ref={confirmRef}
            text={"是否删除全部?"}
            cancelBtnText={"取消"}
            confirmBtnText={"确定"}
            handleConfirm={handleConfirmClear}
          />
        </div>
      </PlayListWrapper>
    </CSSTransition>
  )
}
// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  currentIndex: state.getIn(['player', 'currentIndex']),
  currentSong: state.getIn(['player', 'currentSong']),
  playList: state.getIn(['player', 'playList']),//播放列表
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),//顺序排列时的播放列表
  showPlayList: state.getIn(['player', 'showPlayList']),
  mode: state.getIn(['player', 'mode'])
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    togglePlayListDispatch(data: any) {
      dispatch(changeShowPlayList(data));
    },
    //修改当前歌曲在列表中的index，也就是切歌
    changeCurrentIndexDispatch(data: any) {
      dispatch(changeCurrentIndex(data));
    },
    //修改当前的播放模式
    changeModeDispatch(data: any) {
      dispatch(changePlayMode(data));
    },
    //修改当前的歌曲列表
    changePlayListDispatch(data: any) {
      dispatch(changePlayList(data));
    },
    deleteSongDispatch(data: any) {
      dispatch(deleteSong(data));
    },
    clearDispatch() {
      dispatch(changeFullScreen(false))
      // 1.清空两个列表
      dispatch(changePlayList([]));
      dispatch(changeSequencePlayList([]));
      // 2.初始currentIndex
      dispatch(changeCurrentIndex(-1));
      // 3.关闭PlayList的显示
      dispatch(changeShowPlayList(false));
      // 4.将当前歌曲置空
      dispatch(changeCurrentSong({}));
      // 5.重置播放状态
      dispatch(changePlayingState(false));
    }
  }
};
// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList));

const PlayListWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: ${props => props.theme.backgroundColorShadow};
  &.list-fade-enter{
    opacity: 0;
  }
  &.list-fade-enter-active{
    opacity: 1;
    transition: all 0.3s;
  }
  &.list-fade-exit{
    opacity: 1;
  }
  &.list-fade-exit-active{
    opacity: 0;
    transition: all 0.3s;
  }
  .list_wrapper{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: ${props => props.theme.highlightBkColor};
    transform: translate3d(0, 0, 0);
    .list_close{
      text-align: center;
      line-height: 50px;
      background: ${props => props.theme.backgroundColor};
      font-size: ${props => props.theme.fontsizel};
      color: ${props => props.theme.fontColorDesc};
    }
  }
`;

const ScrollWrapper = styled.div`
  height: 400px;
  overflow: hidden;
`;

const ListHeader = styled.div`
  position: relative;
  padding: 20px 30px 10px 20px;
  .title{
    display: flex;
    align-items: center;
    >div{
      flex:1;
      .text{
        flex: 1;
        font-size: ${props => props.theme.fontsizell};
        color: ${props => props.theme.fontColorDesc};
      }
    }
    .iconfont {
      margin-right: 10px;
      font-size: ${props => props.theme.fontsizell};
      color: ${props => props.theme.color};
    }
    .clear{
      ${ extendClick() }
      font-size: ${props => props.theme.fontsizel};
    }
  }
`
const ListContent = styled.div`
  .item{
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 30px 0 20px;
    overflow: hidden;
    .current{
      flex: 0 0 20px;
      width: 20px;
      font-size: ${props => props.theme.fontsizes};
      color: ${props => props.theme.color};
    }
    .text{
      flex: 1;
      ${ noWrap() }
      font-size: ${props => props.theme.fontsizem};
      color:  ${props => props.theme.fontColorDesc2};
      .icon-favorite{
        color: ${props => props.theme.color};
      }
    }
    .like{
      ${ extendClick() }
      margin-right: 15px;
      font-size: ${props => props.theme.fontsizem};
      color: ${props => props.theme.color};
    }
    .delete{
      ${ extendClick() }
      font-size: ${props => props.theme.fontsizes};
      color:  ${props => props.theme.color};
    }
  }
`