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
export {
    getCount,
    debounce
}
