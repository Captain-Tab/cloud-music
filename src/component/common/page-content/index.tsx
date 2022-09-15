import styled from 'styled-components';
import React from 'react';


interface Ipros {
  play: number,
  children?: JSX.Element | React.ReactElement
}

const PageContent = (props: Ipros) => {
  return (
    <Content play={props.play}>
     { props.children }
    </Content>
  )
}

export default PageContent

const Content = styled.div<Ipros>`
  position: fixed;
  top: ${props => props.play > 0 ? "0px" : "90px"};
  bottom: ${props => props.play > 0 ? "60px" : 0};
  width: 100%;
`