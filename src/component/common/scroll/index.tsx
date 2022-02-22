import React, {
    forwardRef,
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    RefObject} from "react"
import BScroll from "better-scroll"
import styled from'styled-components';


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
    const { pullUp, pullDown, onScroll } = props;
    const [bScroll, setBScroll] = useState<any> (null);
    const scrollRef: RefObject<any> = useRef();

    // 初始化
    useEffect (() => {
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
            setBScroll ({});
        }
        //eslint-disable-next-line
    }, []);

    // 监听依赖
    useEffect (() => {
        if (!bScroll || !onScroll) return;
        bScroll.on ('scroll', (scroll: any) => {
            onScroll (scroll);
        })
        return () => {
            bScroll.off ('scroll');
        }
    }, [onScroll, bScroll]);

    useEffect (() => {
        if (!bScroll || !pullUp) return;
        bScroll.on ('scrollEnd', () => {
            // 判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100){
                pullUp();
            }
        });
        return () => {
            bScroll.off ('scrollEnd');
        }
    }, [pullUp, bScroll]);

    useEffect (() => {
        if (!bScroll || !pullDown) return;
        bScroll.on ('touchEnd', (pos:any) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                pullDown();
            }
        });
        return () => {
            bScroll.off ('touchEnd');
        }
    }, [pullDown, bScroll]);


    useEffect (() => {
        if (refresh && bScroll){
            bScroll.refresh ();
        }
    });

    useImperativeHandle (ref, () => ({
        refresh () {
            if (bScroll) {
                bScroll.refresh ();
                bScroll.scrollTo (0, 0);
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
        </ScrollContainer>
    );
})

export default Index;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
