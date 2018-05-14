import request from '../utils/request';
import { push } from 'react-router-redux';

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

export async function updateUser(params) {
  return request({
    url: `/users/update`,
    data: params,
    method: "put"
  })
}

export async function updateInfo(params) {
  return request({
    url: `/users/update/info`,
    data: params,
    method: "put"
  })
}

export async function deleteUser(params) {
  return request({
    url: `/users/delete`,
    data: params,
    method: "delete"
  })
}

export async function getUserInfo() {
  return request({
    url: `/users/getUserInfo`,
    method: "get"
  })
}
  
  