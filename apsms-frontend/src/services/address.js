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
        method: `post`,
        data: params
    })
}

export async function deleteAddress(params) {
    return request({
        url: `/address/deleteAddress`,
        method: `delete`,
        params: params
    })
}