import { findAllAddress} from "../../services/address"
import { getShoppingList, findAllByIds } from "../../services/shoppingList"
import { queryOrders, delivery} from "../../services/order"
import { getQueryString } from "../../utils/common.js"
import { routerRedux } from 'dva/router';
import { message, Select} from "antd";

export default {

    namespace: 'all_orders',
  
    state: {
        ordersList: [],
        pagination: {},
        goodsDetail: {},
    },
  
    subscriptions: {
      setup({ dispatch, history}) {  
        history.listen(location => {
          if (location.pathname === "/allOrders") {
            dispatch({
                type: 'init',
                payload: {
                    pagination: {
                        name: "",
                        pageNumber: 0,
                        pageSize: 10,
                    }
                }
            })
          }
        });
      },
    },
  
    effects: {
        *init({ payload }, { call, put }) {
            yield put({
              type: "save",
              payload: {
                pagination: payload.pagination
              }
            });
            yield put({
              type: "pullData",
              payload: payload.pagination
            });
          },
        *pullData({ payload }, { put, call, select }){
            console.log("////////////////")
            console.log(payload)
            let params = payload
            let pagination = yield select(state=>state.all_orders.pagination)
            const result = yield call(queryOrders, params);
            if (result.data.success === true) {
              let goods = result.data.data.content
              console.log(result.data.data)
              let params = {
                pageNumber: result.data.data.number,
                total: result.data.data.totalElements,
                current: result.data.data.number + 1,
              }
              pagination = {...pagination, ...params}
              yield put({
                type: "save",
                payload: {
                  ordersList: goods,
                  pagination: pagination
                }
              });
            } else {
              message.error(result.data.data)
            }
        },
        *delivery({ payload }, { put, call, select }) {
            const result = yield call(delivery, payload);
            let pagination = {
              name: "",
              pageNumber: 0,
              pageSize: 10,
            }
            if (result.data.success === true) {
                yield put({
                  type: 'pullData',
                  payload: pagination
                })
            } else {
              message.error(result.data.data)
            }
        }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  };
  