import { CHANGE_BANNER, CHANGE_RECOMMEND_LIST, CHANGE_ENTER_LOADING } from './constants';
import { fromJS } from 'immutable';
import { fetchBanner, fetchRecommendList } from '../../fetch/index'

export const changeBannerList = (data: any) => ({
    type: CHANGE_BANNER,
    data: fromJS(data)
});

export const changeRecommendList = (data: any) => ({
    type: CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
});

export const changeEnterLoading = (data: any) => ({
    type: CHANGE_ENTER_LOADING,
    data
});

export const getBannerList = () => {
    return (dispatch: any) => {
        fetchBanner().then((data: any) => {
            const action = changeBannerList(data.banners);
            dispatch(action);
        }).catch(() => {
            console.log("轮播图数据传输错误");
        })
    }
};
export const getRecommendList = () => {
    return async (dispatch: any) => {
        // try {
        //     const { data } = await fetchRecommendList<any>()
        //     console.log('data', data)
        //     dispatch(changeRecommendList(data.result))
        //     dispatch(changeEnterLoading(false))
        // } catch(error: any) {
        //     console.log("推荐歌单数据传输错误", error)
        // }
        fetchRecommendList().then((data: any) => {
            dispatch(changeRecommendList(data.result));
            dispatch(changeEnterLoading(false));//改变loading
        }).catch(() => {
            console.log("推荐歌单数据传输错误");
        });
    }
};
