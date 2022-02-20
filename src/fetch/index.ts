import axiosInstance from "../plugin/axiosInstance";
import { AxiosPromise, AxiosRequestConfig } from "axios";

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
