import request from '../utils/request';

export async function checkLogin(params) {
    return request({
      url: `/users/check`,
      method: `post`,
      params: params
    })
  }
  