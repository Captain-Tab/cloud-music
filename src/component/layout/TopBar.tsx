import React from "react";
import styled from "styled-components";

const TopBar = () :JSX.Element =>  {
    return <TopContent>

    </TopContent>
}

const TopContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: ${props => props.color};
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    &.iconfont {
      font-size: 25px;
    }
  }
`


