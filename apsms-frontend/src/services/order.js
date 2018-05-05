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