import axios, { AxiosInstance } from 'axios'
import { BASE_URL } from '../const/base'

// 新建axios实例
const axiosInstance: AxiosInstance = axios.create ({
  baseURL: BASE_URL
});

axiosInstance.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        return Promise.reject(res)
    }
    if (res.data.code !== 200) {
        return Promise.reject(res.data)
    }
    return res.data
})

axiosInstance.interceptors.request.use((config) => {
    return config
})


export default axiosInstance
