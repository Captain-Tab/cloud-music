import { SET_HOT_KEYWRODS, SET_SUGGEST_LIST, SET_RESULT_SONGS_LIST, SET_ENTER_LOADING } from './constants';
import { fromJS } from 'immutable';
import { fetchHotKeyWordsRequest, fetchSuggestListRequest, fetchResultSongsListRequest } from './../../fetch';

const changeHotKeyWords = (data: any) => ({
  type: SET_HOT_KEYWRODS,
  data: fromJS(data)
});

const changeSuggestList = (data: any) => ({
  type: SET_SUGGEST_LIST,
  data: fromJS(data)
});

const changeResultSongs = (data: any) => ({
  type: SET_RESULT_SONGS_LIST,
  data: fromJS(data)
});

export const changeEnterLoading = (data: any) => ({
  type: SET_ENTER_LOADING,
  data
});

export const getHotKeyWords = () => {
  return (dispatch: any) => {
    fetchHotKeyWordsRequest().then((data: any) => {
      dispatch(changeHotKeyWords(data.result.hots));
    })
  }
};
export const getSuggestList = (query: any) => {
  return (dispatch: any) => {
    fetchSuggestListRequest(query).then((data: any) => {
      if(!data)return;
      const res = data.result || [];
      dispatch(changeSuggestList(res));
    })
    fetchResultSongsListRequest(query).then((data: any) => {
      if(!data)return;
      const res = data.result.songs || [];
      dispatch(changeResultSongs(res));
      dispatch(changeEnterLoading(false));
    })
  }
};