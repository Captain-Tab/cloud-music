import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from './constants';
import { fetchAlbumDetail } from "../../fetch"
import { fromJS } from 'immutable';

const changeCurrentAlbum = (data: any) => ({
    type: CHANGE_CURRENT_ALBUM,
    data: fromJS(data)
});

export const changeEnterLoading = (data: any) => ({
    type: CHANGE_ENTER_LOADING,
    data
});

export const getAlbumList = (id: string) => {
    return (dispatch: any) => {
        fetchAlbumDetail(id).then((res: any) => {
            const data = res.playlist;
            dispatch(changeCurrentAlbum(data));
            dispatch(changeEnterLoading(false));
        }).catch(() => {
            console.log("获取album数据失败!")
        });
    }
};
