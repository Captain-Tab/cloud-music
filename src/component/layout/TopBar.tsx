import React from "react";
import styled from "styled-components";
import Icon from "../common/Icon/Icon";
import { NavLink } from "react-router-dom";
import cx from "classnames";

interface Iprops {
    children: React.ReactElement
}

const TopBar = (props: Iprops) :JSX.Element =>  {
    return(
        <Main>
            <TopWrapper>
                <TopContent>
                    <Icon  className={'customIcon'} type={'menu'}/>
                    <span>Red Bean Ice</span>
                    <Icon className={'customIcon'} type={'search'} />
                </TopContent>

                <Tab>
                    <NavLink to={'/'} >
                        <TabItem className={cx({'selected': true})}>
                            <span>推荐</span>
                        </TabItem>
                    </NavLink>
                    <NavLink to={'/artists'}>
                        <TabItem className={cx({'selected': true})}>
                            <span>歌手</span>
                        </TabItem>
                    </NavLink>
                    <NavLink to={'/rank'}>
                        <TabItem className={cx({'selected': true})}>
                            <span>排行榜</span>
                        </TabItem>
                    </NavLink>
                </Tab>
            </TopWrapper>

            <div className={'showArea'}>
                { props. children}
            </div>
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
  height: 105px;
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
