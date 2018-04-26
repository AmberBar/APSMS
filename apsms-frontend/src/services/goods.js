import request from '../utils/request';
import { push } from 'react-router-redux';

export async function createGoods(params) {
  return request({
    url: `/goods/create`,
    method: `post`,
    params: params
  })
}