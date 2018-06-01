import request from '../utils/request';

export async function findAllAddress(params) {
    return request({
        url: `/address/findAll`,
        method: `get`,
        params: params
      })
}

export async function createAddress(params) {
    return request({
        url: `/address/createAddress`,
        method: `get`,
        data: params
    })
}