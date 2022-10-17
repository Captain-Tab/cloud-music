import React, {
    forwardRef,
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    RefObject, useMemo
} from "react"
import BScroll from "better-scroll"
import styled from'styled-components';
import LoadingExtra from "../loading-extra";
import Loading from "../loading";
import {debounce} from "../../../utils";


interface Iprops {
    direction: 'vertical' | 'horizontal',
    refresh: boolean,
    onScroll: (arg:any)=> any,
    pullUp: ()=> any,
    pullDown: ()=> any,
    pullUpLoading: boolean,
    pullDownLoading: boolean,
    bounceTop: boolean,// 是否支持向上吸顶
    bounceBottom: boolean // 是否支持向上吸顶
    click?: boolean,
    children?: JSX.Element | React.ReactElement
}

const defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll:null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};

// eslint-disable-next-line react/display-name
const Index = forwardRef((props: Iprops | any, ref) => {
    props = { ...defaultProps, ...props}
    const { direction, click, refresh,  bounceTop, bounceBottom } = props;
    const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props;
    const [bScroll, setBScroll] = useState<any> (null);
    const scrollRef: RefObject<any> = useRef()

    const PullupDisplayStyle = pullUpLoading ? { display: "" } : { display: "none" };
    const PullDownDisplayStyle = pullDownLoading ? { display: "" } : { display: "none" };

    const pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 300)
    }, [pullUp]);

    const pullDownDebounce = useMemo(() => {
        return debounce(pullDown, 300)
    }, [pullDown]);


    // 初始化
    useEffect(() => {
        const scroll = new BScroll (scrollRef.current, {
            scrollX: direction === "horizontal",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            bounce:{
                top: bounceTop,
                bottom: bounceBottom
            },
            mouseWheel: true
        });
        setBScroll(scroll);
        return () => {
            setBScroll({});
        }
        //eslint-disable-next-line
    }, []);

    // 监听依赖
    useEffect (() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll', (scroll: any) => {
            onScroll (scroll);
        })
        return () => {
            bScroll.off('scroll');
        }
    }, [onScroll, bScroll]);

    useEffect (() => {
        if (!bScroll || !pullUp) return;
        bScroll.on ('scrollEnd', () => {
            // 判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100){
                pullUpDebounce()
            }
        });
        return () => {
            bScroll.off('scrollEnd');
        }
    }, [pullUpDebounce, pullUp, bScroll]);

    useEffect (() => {
        if (!bScroll || !pullDown) return;
        bScroll.on ('touchEnd', (pos:any) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                pullDownDebounce()
            }
        });
        return () => {
            bScroll.off('touchEnd');
        }
    }, [pullDownDebounce, pullDown, bScroll]);


    useEffect (() => {
        if (refresh && bScroll){
            bScroll.refresh();
        }
    });

    useImperativeHandle (ref, () => ({
        refresh () {
            if (bScroll) {
                bScroll.refresh()
                bScroll.scrollTo(0, 0)
            }
        },
        getBScroll () {
            if (bScroll) {
                return bScroll;
            }
        }
    }));


    return (
        <ScrollContainer ref={scrollRef}>
            {props.children}
            {/* 滑到底部加载动画 */}
            <PullUpLoading style={ PullupDisplayStyle }><Loading /></PullUpLoading>
            {/* 顶部下拉刷新动画 */}
            <PullDownLoading style={ PullDownDisplayStyle }><LoadingExtra /></PullDownLoading>
        </ScrollContainer>
    );
})

export default Index;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0;
  height: 30px;
  margin: auto;
  z-index: 100;
`;
