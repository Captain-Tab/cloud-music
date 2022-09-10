import styled from 'styled-components';
import React, { forwardRef } from 'react';
import { getName } from '../../utils';
import { noWrap } from '../../const/global-style'
import { connect } from 'react-redux';

import {
  changePlayList,
  changeCurrentIndex,
  changeSequencePlayList
} from '../../store/player/actionCreators';

// type IFunc = (arg: any) => any

// interface Iprops {
//   collectCount: number, 
//   showCollect: boolean,
//   songs: any[]
//   showBackground: boolean;
//   hangePlayListDispatch: IFunc, 
//   changePlayListDispatch: IFunc,
//   changeCurrentIndexDispatch: IFunc,
//   changeSequecePlayListDispatch: IFunc,
//   musicAnimation: (argX: number, argY: number) => any
// }

interface ISongList {
  showBackground: boolean;
  ref: any;
}

const SongsList = forwardRef((props: any, refs) => {
  const { collectCount,
    showCollect,
    songs,
    showBackground,
    changePlayListDispatch,
    changeCurrentIndexDispatch,
    changeSequecePlayListDispatch,
    musicAnimation
  } = props;
  const totalCount = songs.length;

  const selectItem = (e: any, index: number) => {
    changePlayListDispatch(songs);
    changeSequecePlayListDispatch(songs);
    changeCurrentIndexDispatch(index);
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
  }

  const songList = (list: any[]) => {
    const res = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      res.push(
        <li key={item.id} onClick={(e) => selectItem(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} - {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      )
    }
    return res;
  };

  const collect = (count: number) => {
    return (
      <div className="add_list">
        <i className="iconfont">&#xe62d;</i>
        <span>收藏({Math.floor(count / 1000) / 10}万)</span>
      </div>
      // <div className="isCollected">
      //   <span>已收藏({Math.floor(count/1000)/10}万)</span>
      // </div>
    )
  };

  return (
    <SongList ref={refs} showBackground={showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span>播放全部 <span className="sum">(共{totalCount}首)</span></span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>
        {songList(songs)}
      </SongItem>
    </SongList>
  )
});

// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    changePlayListDispatch(data: any) {
      dispatch(changePlayList(data));
    },
    changeCurrentIndexDispatch(data: any) {
      dispatch(changeCurrentIndex(data));
    },
    changeSequecePlayListDispatch(data: any) {
      dispatch(changeSequencePlayList(data))
    }
  }
};

// 将ui组件包装成容器组件
export default connect(null, mapDispatchToProps)(React.memo(SongsList));


const SongList = styled.div<ISongList>`
  border-radius: 10px;
  opacity: 0.98;
  ${props => props.showBackground ? `background: ${props.theme.highlightBkColor}` : ""}
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
      right: 0; top :0; bottom: 0;
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