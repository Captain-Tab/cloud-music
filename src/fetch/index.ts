import axiosInstance from "../plugin/axiosInstance";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import {IArtistsParams} from "../types/artist";

// 默认请求参数
export const request = <T>(data: AxiosRequestConfig): AxiosPromise<T> => {
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
        params: { offset: count}
    })
}

// 获取歌手列表
export const fetchArtists = <T>(params: IArtistsParams) => {
    return request<T> ({
        url: '/artists',
        params: {
            cat: params.category,
            initial: params.alpha.toLowerCase(),
            offset: params.count
        }
    })
}
