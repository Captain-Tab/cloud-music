import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Icon from "../icon";

interface IProps {
    handleClick: (arg?: any) => any;
    title: string;
    isMarquee: boolean;
}

const defaultProps = {
    handleClick: () => { console.log('header')},
    title: "标题",
    isMarquee: false
}

// 处理函数组件拿不到ref的问题,所以用forwardRef
// eslint-disable-next-line react/display-name
const Header = forwardRef((props: IProps, ref) => {
    props = { ...defaultProps, ...props }
    const { handleClick, title, isMarquee} = props;
    return (
        // @ts-ignore
        <HeaderContainer ref={ref}>
            <Icon type={'back'} onClick={handleClick}/>
            {/*<i className="iconfont back"  onClick={handleClick}>&#xe655;</i>*/}
            {
                // eslint-disable-next-line
                isMarquee ?<h1>{title}</h1>:
                    <h1>{title}</h1>
            }
        </HeaderContainer>
    )
})

export default React.memo(Header);

const HeaderContainer = styled.div`
  position: fixed;
  padding: 0 10px 5px 10px;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  // color: ${props =>  props.theme.fontColorLight};
  .back{
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  >h1{
    font-size: ${props => props.theme.fontColorLight};
    font-weight: 700;
  }
`
