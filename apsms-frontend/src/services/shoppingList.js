import request from '../utils/request';
  
export async function getShoppingList(params) {
    return request({
      url: `/shoppingList/get`,
      params: params,
      method: "get"
    })
}

export async function queryAll(params) {
  return request({
    url: `/shoppingList/findAll`,
    params: params,
    method: "get"
  })
}