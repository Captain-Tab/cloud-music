import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen
} from "../../store/player/actionCreators";
import MiniPlayer from './mini';
import NormalPlayer from './normal';
import { getSongUrl, isEmptyObject, shuffle, findIndex } from "../../utils";
import { playMode } from '../../const/staticVariable';
import Toast from "../../component/common/toast";

// interface ISong {
//   al: any,
//   name: string,
//   ar: any[]
// }


// type IFunc = (arg: any) => any

// interface IProps {
//   fullScreen: boolean,
//   playing: boolean,
//   percent: number,
//   mode: number,
//   currentSong: any,
//   currentIndex: number,
//   playList: any,
//   sequencePlayList: any,
//   togglePlayingDispatch: IFunc,
//   changeCurrentIndexDispatch: IFunc,
//   changeCurrentDispatch: IFunc,
//   changePlayListDispatch: IFunc, //改变playList
//   changeModeDispatch: IFunc, //改变mode
//   toggleFullScreenDispatch: IFunc,
// }

const Player = (props: any) => {
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const [preSong, setPreSong] = useState<any>({});
  const [modeText, setModeText] = useState("");
  const [songReady, setSongReady] = useState(true);

  const audioRef: any = useRef();
  const toastRef: any = useRef();

  const {
    playing,
    currentSong: immutableCurrentSong,
    currentIndex,
    playList: immutablePlayList,
    mode,//播放模式
    sequencePlayList: immutableSequencePlayList,//顺序列表
    fullScreen,
    togglePlayingDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changePlayListDispatch,//改变playList
    changeModeDispatch,//改变mode
    toggleFullScreenDispatch
  } = props;

  const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();
  const currentSong = immutableCurrentSong.toJS();


  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady
    )
      return;
    const current = playList[currentIndex];
    setPreSong(current);
    setSongReady(false);
    changeCurrentDispatch(current);//赋值currentSong
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play().then(() => {
        setSongReady(true);
      });
    });
    togglePlayingDispatch(true);//播放状态
    setCurrentTime(0);//从头开始播放
    setDuration((current.dt / 1000) | 0);//时长
  }, [playList, currentIndex]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  useEffect(() => {
    console.log('gogo', currentSong)
  })

  const clickPlaying = (e: React.MouseEvent<HTMLElement, MouseEvent>, state: any) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  const updateTime = (e: any ) => {
    setCurrentTime(e.target.currentTime);
  };

  const onProgressChange = (curPercent: number) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  };
  //一首歌循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    changePlayingState(true);
    audioRef.current.play();
  };

  const handlePrev = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  const changeMode = () => {
    const newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      changePlayListDispatch(sequencePlayList);
      const index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText("顺序循环");
    } else if (newMode === 1) {
      //单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText("单曲循环");
    } else if (newMode === 2) {
      //随机播放
      const newList = shuffle(sequencePlayList);
      const index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("随机播放");
    }
    changeModeDispatch(newMode);
    toastRef.current.show();
  };

  const handleNext = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  };
  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          percent={percent}
        />
      )
      }
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          mode={mode}
          changeMode={changeMode}
          duration={duration}
          currentTime={currentTime}
          percent={percent}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      )
      }
      <audio
        ref={audioRef}
        onTimeUpdate={updateTime}
        onEnded={handleEnd}
      ></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
    </div>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playing: state.getIn(["player", "playing"]),
  currentSong: state.getIn(["player", "currentSong"]),
  showPlayList: state.getIn(["player", "showPlayList"]),
  mode: state.getIn(["player", "mode"]),
  currentIndex: state.getIn(["player", "currentIndex"]),
  playList: state.getIn(["player", "playList"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch:any) => {
  return {
    togglePlayingDispatch(data: any) {
      dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data: any) {
      dispatch(changeFullScreen(data));
    },
    togglePlayListDispatch(data: any) {
      dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index: number) {
      dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data: any) {
      dispatch(changeCurrentSong(data));
    },
    changeModeDispatch(data: any) {
      dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data: any) {
      dispatch(changePlayList(data));
    }
  };
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));