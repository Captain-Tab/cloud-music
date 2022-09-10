import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { getRanklist } from "../../store/rank/actionCreators";
import { filterIndex } from "../../utils";
import styled from "styled-components";
import Loading from "../../component/common/loading";
import Scroll from "../../component/common/scroll";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";

interface IListProps {
    globalRank: boolean
}

interface IListItMProps {
    tracks: any[]
}

const Rank = (props: any) : JSX.Element => {
    const { rankList:list, loading } = props
    const { getRankListDataDt } = props
    const rankList = list ? list.toJS () : []
    const globalStartIndex = filterIndex(rankList);
    const officialList = rankList.slice(0, globalStartIndex);
    const globalList = rankList.slice(globalStartIndex);
    const displayStyle = loading ? {"display":"none"}:  {"display": ""};
    const navigate = useNavigate()

    // 获取初始化参数
    useEffect(()=> {
        !rankList.length && getRankListDataDt()
    }, [])

    const enterDetail = (id: number) => {
        navigate(`/rank/${id}`)
    }

    const renderSongList = (list: any[]) => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index+1}. {item.first} - {item.second}</li>
                    })
                }
            </SongList>
        ) : null;
    }

    const renderRankList = (list: any[], global?:any) => {
        return (
            <List globalRank={global}>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={index} tracks={item.tracks} onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <img src={item.coverImgUrl} alt=""/>
                                    <div className="decorate"/>
                                    <span className="update_frequency">{item.updateFrequency}</span>
                                </div>
                                { renderSongList(item.tracks)  }
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    return (
        <Container>
            <Scroll>
                <div>
                    <h1 className="official" style={displayStyle}>官方榜</h1>
                    { renderRankList(officialList) }
                    <h1 className="global" style={displayStyle}>全球榜</h1>
                    { renderRankList(globalList, true) }
                    { loading ? <EnterLoading><Loading /></EnterLoading> : null }
                </div>
            </Scroll>
            <Outlet />
        </Container>
    )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
    rankList: state.getIn (['rank', 'rankList']),
    loading: state.getIn (['rank', 'loading']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
    return {
        getRankListDataDt () {
            dispatch (getRanklist());
        }
    }
};

export default connect (mapStateToProps, mapDispatchToProps)(React.memo(Rank));

const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .official,.global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${props => props.theme.fontsizem};
    color: ${props => props.theme.fontColorDesc};
  }
`;


export const List = styled.ul<IListProps>`
  margin-top: 10px;
  padding: 0 5px;
  display: ${props => props.globalRank ? "flex": "" };
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${props => props.theme.backgroundColor};
  &::after{
    content:"";
    display:block;
    width: 32vw;
  }
`
export const ListItem = styled.li<IListItMProps>`
  display: ${props => props.tracks.length ? "flex": ""};
  padding: 3px 0;
  border-bottom: 1px solid ${props=> props.theme.borderColor};
  .img_wrapper{
    width:  ${props => props.tracks.length ? "27vw": "32vw"};
    height: ${props => props.tracks.length ? "27vw": "32vw"};
    border-radius: 3px;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,100%,0),hsla(0,0%,43%,.4));
    }
    img{
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update_frequency{
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${props => props.theme.fontsizess};
      color: ${props => props.theme.fontColorLight};
    }
  }
`;

const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  >li{
    font-size: ${props => props.theme.fontsizes};
    color: grey;
  }
`;

const EnterLoading = styled.div`
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
`
