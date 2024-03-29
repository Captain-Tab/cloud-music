import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { prefixStyle } from '../../../utils';

interface IProps {
  percent: number,
  percentChange: (percent: number) => any
}

const ProgressBar = (props: IProps) => {
  const progressBar: any = useRef();
  const progress: any = useRef();
  const progressBtn: any = useRef();
  const [touch, setTouch] = useState({} as any);
  const { percent, percentChange } = props;
  const progressBtnWidth = 16;
  const transform = prefixStyle('transform') as string;

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progress.current.style.width = `${offsetWidth}px`;
      progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
    // eslint-disable-next-line
  }, [percent]);

  const _changePercent = () => {
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const curPercent = progress.current.clientWidth / barWidth;
    percentChange(curPercent);
  }

  const _offset = (offsetWidth: number) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };

  const progressClick = (e: React.MouseEvent) => {
    const rect = progressBar.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
  };

  const progressTouchStart = (e: any) => {
    const startTouch: Record<string, string | boolean> = {};
    //initial为true表示滑动动作开始了
    startTouch.initiated = true;
    startTouch.startX = e.touches[0].pageX;
    startTouch.left = progress.current.clientWidth;
    setTouch(startTouch);
  };

  const progressTouchMove = (e: any) => {
    if (!touch.initiated) return;
    //滑动距离   
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
  };

  const progressTouchEnd = () => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
    _changePercent();
  };

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick} >
        <div className="progress" ref={progress}></div>
        <div className="progress-btn-wrapper" ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default ProgressBar;

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner{
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, .3);
    .progress{
      position: absolute;
      height: 100%;
      background: ${props => props.theme.color};
    }
    .progress-btn-wrapper{
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn{
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${props => props.theme.borderColor};
        border-radius: 50%;
        background: ${props => props.theme.color};
      }
    }
  }
`