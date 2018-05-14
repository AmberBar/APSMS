import request from '../utils/request';

export async function alipay(params) {
    return request({
        url: `/alipay/pay`,
        method: `post`,
        params: params
      })
}

export async function alipayReturn(params) {
    return request({
        url: `/alipay/return`,
        method: `post`,
        params: params
      })
}