import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { BASE_URL } from '../const/base';

// 对axios实例函数改造，因为response拦截器已经返回data
interface CustomAxios extends AxiosInstance {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config: AxiosRequestConfig): Promise<any>;
}

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


export default axiosInstance as CustomAxios // 对axios实例函数改造，因为response拦截器已经返回data


