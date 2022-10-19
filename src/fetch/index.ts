import axiosInstance from "../plugin/axiosInstance";
import { AxiosRequestConfig } from "axios";
import { IArtistsParams } from "../types/artist";

// 默认请求参数
export const request = <T>(data: AxiosRequestConfig): Promise<T> => {
    const defaultConfig: AxiosRequestConfig = {
        method: 'GET'
    }
    return axiosInstance({...defaultConfig, ...data})
}

//  获取banner信息
export const fetchBanner = <T>() => {
    return request<T>({
        url: '/banner'
    })
}

// 获取推荐列表
export const fetchRecommendList = <T>() => {
    return request<T>({
        url: '/personalized'
    })
}

// 获取热门歌手列表
export const fetchHotArtists = <T>(count: number) => {
    return request<T>({
        url: '/top/artists',
        params: { offset: count, limit: 30}
    })
}

// 获取歌手列表
export const fetchArtists = <T>(params: IArtistsParams) => {
    return request<T> ({
        url: '/artist/list',
        params: {
            type: params.type,
            area: params.area,
            initial: params.alpha.toLowerCase(),
            offset: params.count,
            limit: 30,
        }
    })
}

// 获取歌手排行榜
export const fetchRankList = <T>() => {
    return request<T>({
        url: '/toplist/detail'
    })
}

// 获取歌单详情
export const fetchAlbumDetail = <T>(id: string) => {
    return request<T>({
        url: '/playlist/detail',
        params: { id }
    })
}

// 获取歌手详情
export const fetchArtistDetail = <T>(id: string) => {
    return request<T>({
        url: 'artists',
        params: { id }
    })
}

// 获取歌词信息
export const fetchLyricRequest = <T>(id: string) => {
    return request<T>({
        url: 'lyric',
        params: { id }
    })
}

// 获取搜索热词
export const fetchHotKeyWordsRequest = <T>() => {
    return request<T>({
        url: '/search/hot',
    })
};

// 获取推荐列表
export const fetchSuggestListRequest = <T>(query: any) => {
    return request<T>({
        url: '/search/suggest',
        params: { keywords: query }
    })
};

// 获取搜索结果
export const fetchResultSongsListRequest = <T>(query: any) => {
    return request<T>({
        url: '/search',
        params: { keywords: query }
    })
};

// 获取歌曲详情
export const fetchSongDetailRequest = <T>(id: string) => {
    return request<T>({
        url: '/song/detail',
        params: { ids: id }
    })
};