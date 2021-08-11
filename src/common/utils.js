//对debounce进行封装
export function debounce(func, delay) {
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}


export function formatDate(date, fmt) {
    //获取年份 利用正则表达式做字符串的匹配
    //正则表达式：用来匹配字符串
    // + 表示至少一个字符串 多了不限
    // * 表示可有可无 多了不限
    // ？表示可有可无 至多一个
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); //.substr功能为做截取
    }
    //获取月日时分秒

    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    //若数字小于10 则前面补0
    return ('00' + str).substr(str.length);
};