import {
    CHANGE_SINGER_LIST,
    CHANGE_CATOGORY,
    CHANGE_ALPHA,
    CHANGE_PAGE_COUNT,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING,
    CHANGE_ENTER_LOADING
} from './constants';
import { fromJS } from 'immutable';
import {fetchArtists, fetchHotArtists} from "../../fetch";


export const changeCategory = (data: any) => ({
    type: CHANGE_CATOGORY,
    data
});

export const changeAlpha = (data: any) => ({
    type: CHANGE_ALPHA,
    data
});

const changeSingerList = (data: any) => ({
    type: CHANGE_SINGER_LIST,
    data: fromJS(data)
});

export const changePageCount = (data: any) => ({
    type: CHANGE_PAGE_COUNT,
    data
});

//进场loading
export const changeEnterLoading = (data: any) => ({
    type: CHANGE_ENTER_LOADING,
    data
});

//滑动最底部loading
export const changePullUpLoading = (data: any) => ({
    type: CHANGE_PULLUP_LOADING,
    data
});

//顶部下拉刷新loading
export const changePullDownLoading = (data: any) => ({
    type: CHANGE_PULLDOWN_LOADING,
    data
});

// 第一次加载热门歌手
export const getHotArtistsList = () => {
    return (dispatch: any) => {
        fetchHotArtists<any>(0).then((res: any) => {
            const data = res.artists;
            console.log('data', data)
            dispatch(changeSingerList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('热门歌手数据获取失败');
        })
    }
};

// 加载更多热门歌手
export const refreshMoreHotArtistsList = () => {
    return (dispatch: any, getState:any) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        fetchHotArtists<any>(pageCount).then((res: any) => {
            const data = [...singerList, ...res.artists];
            dispatch(changeSingerList(data));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('热门歌手数据获取失败');
        });
    }
};

// 第一次加载对应类别的歌手
export const getArtistsList = (category: any, alpha: any) => {
    return (dispatch: any) => {
        fetchArtists<any>({ category, alpha, count: 0}).then((res: any) => {
            const data = res.artists;
            dispatch(changeSingerList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        });
    }
};

// 加载更多歌手
export const refreshMoreArtistsList = (category: any, alpha: any) => {
    return (dispatch: any, getState: any) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        fetchArtists({ category, alpha, count: pageCount}).then((res: any) => {
            const data = [...singerList, ...res.artists];
            dispatch(changeSingerList(data));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        });
    }
};
