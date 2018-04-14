import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function checkLogin(params) {
  // return request('/api/users/check/');
  request({
    url: `/users/check/${params}`,
  })
}

