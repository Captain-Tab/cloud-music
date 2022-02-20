import React from "react";
import styled from "styled-components";
import Slider from "./Slider";
import List, { IListDetail } from "./List"
import Scroll from "../../component/common/scroll/Scroll";

const Recommend = () : JSX.Element => {
    const bannerList: {imageUrl: string}[] = [1, 2, 3, 4].map(item => {
        return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
    })

    const recommendList: IListDetail[] = [1,2,3,4,5,6,7,8,9,10].map (item => {
        return {
            id: 1,
            picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
            playCount: 17171122,
            name: "朴树、许巍、李健、郑钧、老狼、赵雷"
        }
    });

    return (
        <Main>
            <Slider list={bannerList}/>
            <Content>
                <h1 className="title"> 推荐歌单 </h1>
                <Scroll>
                    <List list={recommendList} />
                </Scroll>
            </Content>
        </Main>
    )
}

export default React.memo(Recommend)

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
