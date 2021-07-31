//存放所有首页里面的数据请求 可以对它们进行统一的管理

import { request } from "./request";

//获取首页的多个数据
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}