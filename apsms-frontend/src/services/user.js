import request from '../utils/request';

export async function checkLogin(params) {
  return request({
    url: `/users/login`,
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

export async function findAllUsers(params) {
  return request({
    url: `/users/query`,
    params: params
  })
}
  
  