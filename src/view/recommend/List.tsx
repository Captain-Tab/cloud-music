import React from "react";
import styled from "styled-components";
import { getCount } from "../../utils/common";
import LazyLoad from 'react-lazyload'

export interface IListDetail {
    id: number;
    picUrl: string;
    playCount: number;
    name: string
}

interface Iprops {
  list: IListDetail[]
}

const List = (props: Iprops): JSX.Element | null => {
    const { list } = props

    return (
        <ListWrapper>
            <ShowList>
                {
                    list.map ((item, index) => {
                        return (
                            <ListItem key={item.id + index}>
                                <div className="img_wrapper">
                                    <div className="decorate"/>
                                    {/* 加此参数可以减小请求的图片资源大小 */}
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('../../assets/img/default-recommend-cover.png')} alt="music"/>}>
                                        <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                                    </LazyLoad>
                                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                                    <div className="play_count">
                                        <i className="iconfont play">&#xe885;</i>
                                        <span className="count">{getCount (item.playCount)}</span>
                                    </div>
                                </div>
                                <div className="desc">{item.name}</div>
                            </ListItem>
                        )
                    })
                }
            </ShowList>
        </ListWrapper>
    )
}
export default React.memo (List);

const ListWrapper = styled.div`
  max-width: 100%;
`;
const ShowList = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px 50px 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ListItem = styled.div`
  position: relative;
  width: 32%;

  .img_wrapper {
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%,.4), hsla(0,0%,100%,0));
    }
    position: relative;
    height: 0;
    padding-bottom: 100%;
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${props => props.theme.fontsizes};
      line-height: 15px;
      color:  ${props => props.theme.fontColorLight};
      .play {
        vertical-align: top;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .desc {
      overflow: hidden;
      margin-top: 2px;
      padding: 0 2px;
      height: 50px;
      text-align: left;
      font-size: ${props => props.theme.fontsizes};
      line-height: 1.4;
      color: ${props => props.theme.fontColorDesc};
    }
`;
