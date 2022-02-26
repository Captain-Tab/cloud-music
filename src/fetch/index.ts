import axiosInstance from "../plugin/axiosInstance";
import { AxiosRequestConfig } from "axios";
import {IArtistsParams} from "../types/artist";

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

