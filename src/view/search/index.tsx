import React, {
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import { CSSTransition } from 'react-transition-group';
import SearchBox from './../../component/common/search-box';
import {
  getHotKeyWords,
  changeEnterLoading,
  getSuggestList
} from '../../store/search/actionCreators';
import { connect } from 'react-redux';
import { getSongDetail } from '../../store/player/actionCreators';
import Scroll from '../../component/common/scroll';
import Loading from '../../component/common/loading';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { getName } from '../../utils';
import MusicalNote from '../../component/common/music-note';
import styled from 'styled-components';
import { useNavigate } from "react-router";

interface ISHow {
  show: any
}

interface IPlay {
  play: number
}

interface IProps {
  hotList: any,
  enterLoading: any,
  suggestList: any,
  songsCount: any,
  songsList: any,
  getHotKeyWordsDispatch: any,
  changeEnterLoadingDispatch: any,
  getSuggestListDispatch: any,
  getSongDetailDispatch: any
}

const Search = (props: IProps): JSX.Element => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState('');
  const musicNoteRef: any = useRef();
  const navigate = useNavigate()

  const {
    hotList,
    enterLoading,
    suggestList: immutableSuggestList,
    songsCount,
    songsList: immutableSongsList,
    getHotKeyWordsDispatch,
    changeEnterLoadingDispatch,
    getSuggestListDispatch,
    getSongDetailDispatch
  } = props;

  const suggestList = immutableSuggestList.toJS();
  const songsList = immutableSongsList.toJS();

  useEffect(() => {
    setShow(true);
    if (!hotList.size)
      getHotKeyWordsDispatch();
    // eslint-disable-next-line
  }, []);

  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const handleQuery = (q: any) => {
    setQuery(q);
    if (!q) return;
    changeEnterLoadingDispatch(true);
    getSuggestListDispatch(q);
  };

  // 路由跳转
  const routerRoaming = (id: string, type: 'recommend' | 'artists') => {
    navigate(`/${type}/${id}`)
  }
  
  // 路由回退
  const historyBack = () => {
    navigate(-1)
  }

  const renderHotKey = () => {
    const list = hotList ? hotList.toJS() : [];
    return (
      <ul>
        {
          list.map((item: any) => {
            return (
              <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                <span>{item.first}</span>
              </li>
            )
          })
        }
      </ul>
    )
  };

  const renderAlbum = () => {
    const albums = suggestList.playlists;
    if (!albums || !albums.length) return;
    return (
      <List>
        <h1 className="title">相关歌单</h1>
        {
          albums.map((item: any, index: number) => {
            return (
              <ListItem key={item.accountId + "" + index}
                onClick={() => routerRoaming(item.id, 'recommend')}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('../../assets/img/music.png')} alt="music" />}>
                    <img src={item.coverImgUrl} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                </div>
                <span className="name">歌单: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };
  const renderArtists = () => {
    const singers = suggestList.artists;
    if (!singers || !singers.length) return;
    return (
      <List>
        <h1 className="title">相关歌手</h1>
        {
          singers.map((item: any, index: number) => {
            return (
              <ListItem key={item.accountId + "" + index} onClick={() => routerRoaming(item.id, 'artists')}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('../../assets/img/artists.png')} alt="singer" />}>
                    <img src={item.picUrl} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                </div>
                <span className="name">歌手: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  const renderSongs = () => {
    return (
      <SongItem style={{ paddingLeft: "20px" }} >
        {
          songsList.map((item: any) => {
            return (
              <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.artists)} - {item.album.name}
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
    )
  };

  const selectItem = (e: any, id: string) => {
    getSongDetailDispatch(id);
    musicNoteRef.current.startAnimation({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY });
  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => historyBack()}>
      <Container play={songsCount}>
        <div className="search_box_wrapper">
          <SearchBox
            back={searchBack}
            newQuery={query}
            handleQuery={handleQuery}></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title">热门搜索</h1>
                {renderHotKey()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>
        <ShortcutWrapper show={query}>
          <Scroll onScorll={forceCheck}>
            <div>
              {renderArtists()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading ? <Loading></Loading> : null}
        <MusicalNote ref={musicNoteRef}></MusicalNote>
      </Container>
    </CSSTransition>
  )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  hotList: state.getIn(['search', 'hotList']),
  enterLoading: state.getIn(['search', 'enterLoading']),
  suggestList: state.getIn(['search', 'suggestList']),
  songsCount: state.getIn(['player', 'playList']).size,
  songsList: state.getIn(['search', 'songsList'])
});

// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getHotKeyWordsDispatch() {
      dispatch(getHotKeyWords());
    },
    changeEnterLoadingDispatch(data: any) {
      dispatch(changeEnterLoading(data))
    },
    getSuggestListDispatch(data: any) {
      dispatch(getSuggestList(data));
    },
    getSongDetailDispatch(id: string) {
      dispatch(getSongDetail(id));
    }
  }
};
// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search));



export const Container = styled.div<IPlay>`
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
  &.fly-enter, &.fly-appear{
    transform: translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    transition: all .3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit{
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active{
    transition: all .3s;
    transform: translate3d(100%, 0, 0);
  }
`
const ShortcutWrapper = styled.div<ISHow>`
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
  display: ${props => props.show ? "" : "none"};
`

const HotKey = styled.div`
  margin: 0 20px 20px 20px;
  .title{
    padding-top: 35px;
    margin-bottom: 20px;
    font-size: ${ props => props.theme.fontsizem};
    color: ${ props => props.theme.fontColorDesc2};
  }
  .item{
    display: inline-block;
    padding: 5px 10px;
    margin: 0 20px 10px 0;
    border-radius: 6px;
    background: ${ props => props.theme.highlightBkColor};
    font-size: ${ props => props.theme.fontsizem};
    color: ${ props => props.theme.fontColorDesc };
  }
`
const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${ props => props.theme.fontColorDesc };
    font-size: ${ props => props.theme.fontsizes };
  }
`;

const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${ props => props.theme.borderColor };
  .img_wrapper {
    margin-right: 20px;
    img{
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name{
    font-size: ${ props => props.theme.fontsizem};
    color: ${ props => props.theme.fontColorDesc };
    font-weight: 500;
  }
`;

const SongItem = styled.ul`
  >li{
    display: flex;
    height: 60px;
    align-items: center;  
    .index{
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
      border-bottom: 1px solid ${ props => props.theme.borderColor };
      >span:first-child{
        color: ${ props => props.theme.fontColorDesc };
      }
      >span:last-child{
        font-size: ${ props => props.theme.fontsizes };
        color: #bba8a8;
      }
    }
  }
`