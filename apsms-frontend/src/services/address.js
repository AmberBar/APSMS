import request from '../utils/request';

export async function findAllAddress(params) {
    return request({
        url: `/address/findAll`,
        method: `get`,
        params: params
      })
}