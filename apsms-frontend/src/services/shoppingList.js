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

export async function updateNumber(params) {
  return request({
    url: `/shoppingList/updateNumber`,
    params: params,
    method: "put"
  })
}

export async function deleteData(params) {
  return request({
    url: `/shoppingList/delete`,
    params: params,
    method: "delete"
  })
}

export async function findAllByIds(params) {
  return request({
    url: `/shoppingList/findAllByIds`,
    data: params,
    method: "post"
  })
}