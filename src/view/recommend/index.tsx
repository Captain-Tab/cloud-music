import React, { useEffect } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import List from "./List"
import Index from "../../component/common/scroll"
import { connect } from "react-redux"
import { forceCheck } from 'react-lazyload';
import { getBannerList, getRecommendList} from '../../store/recommend/actionCreators'
import Loading from "../../component/common/loading";

const Recommend = (props: any) : JSX.Element => {
    const { bannerList, recommendList, enterLoading } = props
    const { getBannerListDt, getRecommendListDt } = props
    // console.log(bannerList, recommendList)

    useEffect(() => {
        if(!bannerList.size){
            getBannerListDt();
        }
        if(!recommendList.size){
            getRecommendListDt();
        }
    }, []);

    const bannerListJS = bannerList ? bannerList.toJS () : []
    const recommendListJS = recommendList ? recommendList.toJS () :[]

    return (
        <Main>
            <Slider list={bannerListJS}/>
            <Content>
                <h1 className="title"> 推荐歌单 </h1>
                <Index onScroll={ forceCheck }>
                    <List list={recommendListJS} />
                </Index>
                { enterLoading ? <Loading/> : null}
            </Content>
        </Main>
    )
}
// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
    // 不要在这里将数据 toJS
    // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn (['recommend', 'enterLoading'])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
    return {
        getBannerListDt() {
            dispatch(getBannerList());
        },
        getRecommendListDt () {
            dispatch(getRecommendList());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo (Recommend));

const Main = styled.div`
  height: 100%;
  width: 100%;
`

const Content = styled.div`
  position: fixed;
  top: 225px;
  bottom: 0;
  width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
  }
`
