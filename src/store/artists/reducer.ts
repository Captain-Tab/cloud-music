import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const defaultState = fromJS({
    artistList: [],
    hasMore: true, // 列表加载完毕
    enterLoading: true,     //控制进场Loading
    pullUpLoading: false,   //控制上拉加载动画
    pullDownLoading: false, //控制下拉加载动画
    pageCount: 0            //这里是当前页数，我们即将实现分页功能
});

export default (state : any = defaultState, action: any) => {
    switch(action.type) {
        case actionTypes.CHANGE_ARTIST_LIST:
            return state.set('artistList', action.data);
        case actionTypes.CHANGE_PAGE_COUNT:
            return state.set('pageCount', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        case actionTypes.CHANGE_PULLUP_LOADING:
            return state.set('pullUpLoading', action.data);
        case actionTypes.CHANGE_PULLDOWN_LOADING:
            return state.set('pullDownLoading', action.data);
        case actionTypes.CHANGE_MORE:
            return state.set('hasMore', action.data);
        default:
            return state;
    }
}
