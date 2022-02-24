/**
 * @interface IArtistInfo
 * 常用列表参数
 * */
export interface IArtistInfo {
    accountId: null | number;
    id: number;
    name: string;
    picUrl: string;
}

/**
 * @interface IArtistList
 * 演员请求返回参数参数
 * */
export interface IArtistList {
    artists: IArtistInfo[];
    code: number;
    more: boolean; // 是否还有下一页
}

/**
 * @interface IArtistsParams
 * 获取歌手分类列表的请求参数
 * */
export interface IArtistsParams {
    type: number;
    area: number;
    alpha: string;
    count: number;
    limit?: number;
}

