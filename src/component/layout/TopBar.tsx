import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Index from "../common/icon";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import Player from '../../view/player'

interface Iprops {
    children: React.ReactElement
}

const TopBar = (props: Iprops) :JSX.Element =>  {
    const [select, setSelect] = useState('/')
    const pathName = new URL(window.location.href).pathname

    // 更新路径变量
    const routeChange =() => {
        setSelect(new URL(window.location.href).pathname)
    }

    // 监听路径参数，更新组件状态
    useEffect(()=> {
        routeChange()
    }, [pathName])

    return(
        <Main>
            <TopWrapper>
                <TopContent>
                    <Index className={'customIcon'} type={'menu'}/>
                    <span>Red Bean Ice</span>
                    <Index className={'customIcon'} type={'search'} />
                </TopContent>

                <Tab>
                    <NavLink to={'/'}>
                        <TabItem className={cx({'selected': select === '/'})}>
                            <span>推荐</span>
                        </TabItem>
                    </NavLink>
                    <NavLink to={'/artists'}>
                        <TabItem className={cx({'selected': select === '/artists'})}>
                            <span>歌手</span>
                        </TabItem>
                    </NavLink>
                    <NavLink to={'/rank'}>
                        <TabItem className={cx({'selected': select === '/rank'})}>
                            <span>排行榜</span>
                        </TabItem>
                    </NavLink>
                </Tab>
            </TopWrapper>

          <div className={'showArea'}>
            {props.children}
          </div>
        
          <Player />
        </Main>
    )
}


const Main = styled.div`
  height: 100%;
  width: 100%;
  > .showArea {
    height: calc(100% - 105px);
  }
`

const TopWrapper = styled.div`
  width: 100%;
`

const TopContent = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: ${props => props.theme.color};
  &>span {
    line-height: 35px;
    color: #f1f1f1;
    font-size: 20px;
  }
  > .customIcon{
    font-size: 20px;
    line-height: 35px;
  }
`

const Tab = styled.div`
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${props => props.theme.color};
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
  }    
`

const TabItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  &.selected {
    span {
      padding: 3px 0;
      font-weight: 700;
      color: #f1f1f1;
      border-bottom: 2px solid #f1f1f1;
    }
  }
`

export default TopBar
