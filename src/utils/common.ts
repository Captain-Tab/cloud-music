import { RankTypes } from "../const/staticVariable";

const getCount = (count: number) : undefined | number | string => {
    if (count < 0) return;
    if (count < 10000) {
        return count;
    } else if (Math.floor (count / 10000) < 10000) {
        return Math.floor (count/1000)/10 + "万";
    } else  {
        return Math.floor (count / 10000000)/ 10 + "亿";
    }
}

//处理数据，找出第一个没有歌名的排行榜的索引
const filterIndex = (rankList: any[]): number | undefined => {
    for (let i = 0; i < rankList.length - 1; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
            return i + 1;
        }
    }
};

//找出排行榜的编号
const filterIdx = (name: string) => {
    for (const key in RankTypes) {
        // @ts-ignore
        if ((RankTypes[key]) as any === name) return key;
    }
    return null;
};

function debounce (func: (args: any) => any, delay: number)  {
    let timer: null | any;
    return (...args: any) => {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            // @ts-ignore
            func.apply(this, args);
            clearTimeout(timer);
        }, delay);
    }
}

//处理歌手列表拼接歌手名字
const getName = (list: any[]): string => {
    let str = "";
    list.map((item, index) => {
        str += index === 0 ? item.name : "/" + item.name;
        return item;
    });
    return str;
};

//判断一个对象是否为空
const isEmptyObject = (obj: Record<string, any>): boolean => !obj || Object.keys(obj).length === 0;

export {
    getCount,
    debounce,
    filterIndex,
    filterIdx,
    getName,
    isEmptyObject
}
