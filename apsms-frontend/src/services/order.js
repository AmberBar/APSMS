import request from '../utils/request';

export async function createOrder(params) {
    return request({
        url: `/order/create`,
        method: `post`,
        data: params
    })
}

export async function findAllOrders(params) {
    return request({
        url: `/order/findAll`,
        method: `get`,
        params: params
    })
}

export async function queryOrders(params) {
    return request({
        url: `/order/findAllOrders`,
        method: `get`,
        params: params
    })
}

export async function delivery(params) {
    return request({
        url: `/order/delivery`,
        method: `get`,
        params: params
    })
}

