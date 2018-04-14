import request from '../utils/request';

export async function checkLogin(params) {
  return request({
    url: `/users/check`,
    method: `post`,
    params: params
  })
}


export async function register(params) {
  return request({
    url: `/users/create`,
    method: `post`,
    data: params
  })
}
  
  