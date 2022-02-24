import {
    CHANGE_ARTIST_LIST,
    CHANGE_CATOGORY,
    CHANGE_ALPHA,
    CHANGE_PAGE_COUNT,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING,
    CHANGE_ENTER_LOADING,
    CHANGE_MORE
} from './constants'
import { fromJS } from 'immutable'
import { fetchArtists, fetchHotArtists } from "../../fetch"
import { IArtistList } from "../../types/artist"

export const changeCategory = (data: any) => ({
    type: CHANGE_CATOGORY,
    data
})

export const changeAlpha = (data: any) => ({
    type: CHANGE_ALPHA,
    data
})

export const changeHasMore = (data: any) => ({
    type: CHANGE_MORE,
    data
})

const changeArtistList = (data: any) => ({
    type: CHANGE_ARTIST_LIST,
    data: fromJS(data)
})

export const changePageCount = (data: any) => ({
    type: CHANGE_PAGE_COUNT,
    data
})

// 进场loading
export const changeEnterLoading = (data: any) => ({
    type: CHANGE_ENTER_LOADING,
    data
})

// 滑动最底部loading
export const changePullUpLoading = (data: any) => ({
    type: CHANGE_PULLUP_LOADING,
    data
})

// 顶部下拉刷新loading
export const changePullDownLoading = (data: any) => ({
    type: CHANGE_PULLDOWN_LOADING,
    data
})

// 加载热门歌手
export const getHotArtistsList = () => {
    return (dispatch: any) => {
        fetchHotArtists<IArtistList>(0).then((res: IArtistList) => {
            const data = res.artists
            dispatch(changeHasMore(res.more))
            dispatch(changeArtistList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        }).catch(() => {
            console.log('热门歌手数据获取失败')
        })
    }
}

// 加载更多热门歌手
export const refreshMoreHotArtistsList = () => {
    return (dispatch: any, getState:any) => {
        const pageCount = getState().getIn(['artists', 'pageCount'])
        const artistList = getState().getIn(['artists', 'artistList']).toJS()
        fetchHotArtists<IArtistList>(pageCount).then((res) => {
            const data = [...artistList, ...res.artists]
            dispatch(changeHasMore(res.more))
            dispatch(changeArtistList(data))
            dispatch(changePullUpLoading(false))
        }).catch(() => {
            console.log('热门歌手数据获取失败')
        })
    }
}

// 加载对应类别的歌手
export const getArtistsList = (category: { type: number, area: number }, alpha: any) => {
    return (dispatch: any) => {
        fetchArtists<IArtistList>({ ...category,  alpha, count: 0}).then((res: IArtistList) => {
            const data = res.artists
            dispatch(changeHasMore(res.more))
            dispatch(changeArtistList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        }).catch(() => {
            console.log('歌手数据获取失败')
        })
    }
}

// 加载更多歌手
export const refreshMoreArtistsList = (category: { type: number, area: number }, alpha: any) => {
    return (dispatch: any, getState: any) => {
        const pageCount = getState().getIn(['artists', 'pageCount'])
        const artistList = getState().getIn(['artists', 'artistList']).toJS()
        fetchArtists<IArtistList>({ ...category, alpha, count: pageCount}).then((res: IArtistList) => {
            const data = [...artistList, ...res.artists]
            dispatch(changeHasMore(res.more))
            dispatch(changeArtistList(data))
            dispatch(changePullUpLoading(false))
        }).catch(() => {
            console.log('歌手数据获取失败')
        })
    }
}
