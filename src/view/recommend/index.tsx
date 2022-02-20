import React from "react";
import styled from "styled-components";
import Slider from "./Slider";

const Recommend = () : JSX.Element => {
    const bannerList: {imageUrl: string}[] = [1, 2, 3, 4].map(item => {
        return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
    })

    return (
        <Main>
        <Slider list={bannerList}/>
    </Main>)
}

export default React.memo(Recommend)

const Main = styled.div`
  height: 100%;
  width: 100%;
`
