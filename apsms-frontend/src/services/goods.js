import request from '../utils/request';
import { push } from 'react-router-redux';

export async function createGoods(params) {
  return request({
    url: `/goods/create`,
    method: `post`,
    data: params
  })
}

export async function findAllGoods(params) {
  return request({
    url: `/goods/findAll`,
    method: `post`,
    params: params
  })
}

export async function deleteData(params) {
  return request({
    url: `/goods/delete`,
    method: `delete`,
    data: params
  })
}

export async function getGoods(params) {
  return request({
    url: `/goods/getGoods`,
    params: params
  })
}