import { RankTypes } from "../const/staticVariable";

// 获取计量单位
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

// 处理数据，找出第一个没有歌名的排行榜的索引
const filterIndex = (rankList: any[]): number | undefined => {
    for (let i = 0; i < rankList.length - 1; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
            return i + 1;
        }
    }
};

// 找出排行榜的编号
const filterIdx = (name: string) => {
    for (const key in RankTypes) {
        // @ts-ignore
        if ((RankTypes[key]) as any === name) return key;
    }
    return null;
};

// 防抖函数
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

// 判断一个对象是否为空
const isEmptyObject = (obj: Record<string, any>): boolean => !obj || Object.keys(obj).length === 0;

// 转换歌曲播放时间
const formatPlayTime = (interval: number): string => {
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
}

// 判断是何种浏览器
const findVendor = (() => {
    // 给css3相关属性增加浏览器前缀，处理浏览器兼容性问题
    const elementStyle = document.createElement("div").style
    //首先通过transition属性判断是何种浏览器
    const transformNames: {[name: string]: string} = {
        webkit: "webkitTransform",
        Moz: "MozTransform",
        O: "OTransfrom",
        ms: "msTransform",
        standard: "Transform"
    };
    for (const key in transformNames) {
    if (elementStyle[transformNames[key] as any] !== undefined) {
      return key;
    }
  }
  return false; 
})()

// 判断前缀名
const prefixStyle = (style: any): string | boolean => {
  if (findVendor === false) {
    return false;
  }
  if (findVendor === "standard") {
    return style;
  }
  return findVendor + style.charAt(0).toUpperCase() + style.substr(1);
}

// 获取歌曲链接地址
const getSongUrl = (id: string): string => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

// 获取随机整数
const getRandomInt = (min: number, max: number) : number =>  {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 随机播放算法
const shuffle = (arr: string[]): string[] => {
  const new_arr: any[] = [];
  arr.forEach(item => {
    new_arr.push(item);
  });
  for (let i = 0; i < new_arr.length; i++) {
    const j = getRandomInt(0, i);
    const t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

// 找到当前的歌曲索引
const findIndex = (song: any, list: any[]) => {
  return list.findIndex(item => {
    return song.id === item.id;
  });
}

export {
    getCount,
    debounce,
    filterIndex,
    filterIdx,
    getName,
    isEmptyObject,
    formatPlayTime,
    prefixStyle,
    getSongUrl,
    shuffle,
    findIndex
}
