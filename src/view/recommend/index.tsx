import React, { useEffect } from "react";
import styled from "styled-components";
import Slider from "./Slider";
import List from "./List"
import Scroll from "../../component/common/scroll/Scroll";
import { connect } from "react-redux";
import { getBannerList,  getRecommendList} from '../../store/recommend/actionCreators'

const Recommend = (props: any) : JSX.Element => {
    const { bannerList, recommendList } = props
    const { getBannerListDt, getRecommendListDt } = props;
    console.log(bannerList, recommendList)

    useEffect (() => {
        getBannerListDt();
        getRecommendListDt();
        //eslint-disable-next-line
    }, [])

    const bannerListJS = bannerList ? bannerList.toJS () : []
    const recommendListJS = recommendList ? recommendList.toJS () :[]

    return (
        <Main>
            <Slider list={bannerListJS}/>
            <Content>
                <h1 className="title"> 推荐歌单 </h1>
                <Scroll>
                    <List list={recommendListJS} />
                </Scroll>
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
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
    return {
        getBannerListDt() {
            dispatch(getBannerList());
        },
        getRecommendListDt () {
            dispatch(getRecommendList());
        },
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Recommend));

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
