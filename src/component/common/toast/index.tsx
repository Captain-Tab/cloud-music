import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

interface IProps {
  text: string
}

const Toast = forwardRef((props: IProps, ref) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState<any>('');
  const { text } = props;

  useImperativeHandle(ref, () => ({
    show() {
      if (timer) clearTimeout(timer);
      setShow(true);
      setTimer(setTimeout(() => {
        setShow(false)
      }, 3000));
    }
  }))
  
  return (
    <CSSTransition in={show} timeout={300} classNames="drop" unmountOnExit>
      <ToastWrapper>
        <div className="text">{text}</div>
      </ToastWrapper>
    </CSSTransition>
  )
});

export default React.memo(Toast);


const ToastWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 50px;
  /* background: ${props => props.theme.backgroundColor}; */
  &.drop-enter{
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  &.drop-enter-active{
    opacity: 1;
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
  }
  &.drop-exit-active{
    opacity: 0;
    transition: all 0.3s;
    transform: translate3d(0, 100%, 0);
  }
  .text{
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: ${props => props.theme.fontsizel};
  }
`
