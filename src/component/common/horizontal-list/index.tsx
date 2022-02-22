import React, { useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import Scroll from "../scroll";
import cx from "classnames";


interface IHoriPorps  {
    list: any[];
    oldVal?: string;
    title?: string;
    handleClick: (arg: any)=> any;
}

const defaultProps = {
    list: [],
    oldVal: '',
    title: '',
    handleClick: null
};

const HorizontalList = (props: IHoriPorps): JSX.Element => {
    props = { ...defaultProps, ...props }
    const Category = useRef(null);
    const { list, oldVal, title } = props;
    const { handleClick } = props;

    //加入初始化内容宽度的逻辑
    useEffect(() => {
        const categoryDOM = Category.current as any;
        const tagElems = categoryDOM.querySelectorAll("span");
        let totalWidth = 0;
        Array.from(tagElems).forEach((ele: any) => {
            totalWidth += ele.offsetWidth;
        });
        categoryDOM.style.width = `${totalWidth}px`;
    }, []);

    return (
        <Scroll direction={"horizontal"}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <ListItem
                                    key={item.key}
                                    className={cx({'selected': oldVal === item.key})}
                                    onClick={() => handleClick(item.key)}>
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    );
}


export default memo(HorizontalList);

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type{
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${props => props.theme.fontsizem};
    vertical-align: middle;
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${props => props.theme.fontsizem};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected{
    color: ${props => props.theme.color};
    border: 1px solid ${props => props.theme.color};
    opacity: 0.8;
  }
`
