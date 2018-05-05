import request from '../utils/request';
import { push } from 'react-router-redux';
  
export async function addGoodsToCart(params) {
    return request({
      url: `/shoppingList/updateCard`,
      data: params,
      method: "put"
    })
  }

export async function buyNow(params) {
  return request({
    url: `/shoppingList/buyNow`,
    data: params,
    method: "post"
  })
}