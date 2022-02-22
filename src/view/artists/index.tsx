import React, {useState} from "react";
import {alphaTypes, categoryTypes} from "../../const/testVariable";
import HorizontalList from "../../component/common/horizontal-list";
import styled from "styled-components";

const Artists = () : JSX.Element => {

    const [category, setCategory] = useState('');
    const [alpha, setAlpha] = useState('');

    const handleUpdateAlpha = (val: string) => {
        setAlpha (val);
    }

    const handleUpdateCategory = (val: string) => {
        setCategory (val);
    }

    return (
        <NavContainer>
            <HorizontalList
                list={categoryTypes}
                title={"分类 (默认热门):"}
                handleClick={handleUpdateCategory}
                oldVal={category} />
            <HorizontalList
                list={alphaTypes}
                title={"首字母:"}
                handleClick={val => handleUpdateAlpha (val)}
                oldVal={alpha} />
        </NavContainer>
    )
}

export default React.memo(Artists)

const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`;
