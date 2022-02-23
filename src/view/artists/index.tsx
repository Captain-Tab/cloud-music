import React, {useEffect, useState} from "react";
import {alphaTypes, categoryTypes} from "../../const/testVariable";
import HorizontalList from "../../component/common/horizontal-list";
import styled from "styled-components";
import Scroll from "../../component/common/scroll";
import {
    changeEnterLoading,
    changePageCount, changePullDownLoading, changePullUpLoading,
    getArtistsList,
    getHotArtistsList, refreshMoreArtistsList, refreshMoreHotArtistsList
} from "../../store/artists/actionCreators";
import {forceCheck} from "react-lazyload";
import Loading from "../../component/common/loading";
import {connect} from "react-redux";

const Artists = (props: any) : JSX.Element => {
    console.log('tttt', props)
    const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;

    const { getHotArtistsDt, updateDt, pullUpRefreshDt, pullDownRefreshDt } = props;

    const [category, setCategory] = useState('');
    const [alpha, setAlpha] = useState('');


    useEffect(() => {
        getHotArtistsDt();
    }, []);


    // 选取歌手字母
    const handleUpdateAlpha = (val: string) => {
        setAlpha (val)
        updateDt(category, val)
    }

    // 选取歌手目录
    const handleUpdateCategory = (val: string) => {
        setCategory (val)
        updateDt(val, alpha)
    }

    const handlePullUp = () => {
        pullUpRefreshDt(category, alpha, category === '', pageCount);
    };

    const handlePullDown = () => {
        pullDownRefreshDt(category, alpha);
    };

    // 渲染函数，返回歌手列表
    const renderSingerList = () => {
        const list = singerList ? singerList.toJS(): []

        console.log('list', list)

        return (
            <List>
                {
                    list.map ((item: any, index: number) => {
                        return (
                            <ListItem key={item.accountId+""+index}>
                                <div className="img_wrapper">
                                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                                </div>
                                <span className="name">{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    };


    return (
        <>
            <NavContainer>
                <HorizontalList
                    list={categoryTypes}
                    title={"分类 (默认热门):"}
                    handleClick={(val) => handleUpdateCategory(val)}
                    oldVal={category} />
                <HorizontalList
                    list={alphaTypes}
                    title={"首字母:"}
                    handleClick={val => handleUpdateAlpha(val)}
                    oldVal={alpha} />
            </NavContainer>

            <ListContainer>
                <Scroll
                    pullUp={ handlePullUp }
                    pullDown = { handlePullDown }
                    pullUpLoading = { pullUpLoading }
                    pullDownLoading = { pullDownLoading }
                    onScroll={forceCheck}
                >
                    { renderSingerList() }
                </Scroll>
                <Loading show={enterLoading}/>
            </ListContainer>
        </>

    )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
    return {
        getHotArtistsDt() {
            dispatch(getHotArtistsList());
        },
        updateDt(category: any, alpha: any) {
            dispatch(changePageCount(0));
            dispatch(changeEnterLoading(true));
            dispatch(getArtistsList(category, alpha));
        },
        // 滑到最底部刷新部分的处理
        pullUpRefreshDt(category: any, alpha: any, hot: any, count: any) {
            dispatch(changePullUpLoading(true));
            dispatch(changePageCount(count+1));
            if(hot){
                dispatch(refreshMoreHotArtistsList());
            } else {
                dispatch(refreshMoreArtistsList(category, alpha));
            }
        },
        //顶部下拉刷新
        pullDownRefreshDt(category: any, alpha: any) {
            dispatch(changePullDownLoading(true));
            dispatch(changePageCount(0));
            if(category === '' && alpha === ''){
                dispatch(getHotArtistsList());
            } else {
                dispatch(getArtistsList(category, alpha));
            }
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Artists);

const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;

 const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`;

 const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${props => props.theme.fontColorDesc};
    font-size: ${props => props.theme.fontsizes};
  }
`;
 const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${props => props.theme.fontsizem};
    color: ${props => props.theme.fontColorDesc};
    font-weight: 500;
  }
`;
