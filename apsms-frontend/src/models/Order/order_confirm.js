import { findAllAddress} from "../../services/address"
import { getShoppingList } from "../../services/shoppingList"
import { createOrder } from "../../services/order"
import { getQueryString } from "../../utils/common.js"
import { routerRedux } from 'dva/router';
import { message, Select } from "antd";

export default {

    namespace: 'order_confirm',
  
    state: {
      goodsDetail: {},
      addresses: [],
      shoppingList: []
    },
  
    subscriptions: {
      setup({ dispatch, history}) {  
        history.listen(location => {
          if (location.pathname === "/order/confirm") {
            let id = getQueryString("id", location)
            dispatch({
              type: 'findOne',
              payload: {
                id: id
              }
            });
            dispatch({
              type: 'init',
              payload: {}
            });
          }
        });
      },
    },
  
    effects: {
      *init({ payload }, { put, call }) {
          yield put({
            type: "findAllAddress",
            payload: {}
          })
      },
      *findAllAddress({ payload }, { put, call }) {
        let result = yield call(findAllAddress)
        if (result.data.success === true) {
          yield put({
            type: "save",
            payload: {
              addresses: result.data.data
            }
          })
        } else {
          message.error(result.data.data)
        }
      },
      *findOne({ payload }, { put, call }) {
        let result = yield call(getShoppingList, payload)
        if (result.data.success === true) {
          let shoppingList = result.data.data;
          let params = []
          params.push(shoppingList)
          yield put({
            type: "save",
            payload: {
              shoppingList: params
            }
          })
        } else {
          message.error("no record!")
        }
      },
      *createOrder({ payload }, { put, call }) {
        let result = yield call(createOrder, payload)
        if (result.data.success === true) {
          message.success("Create order success!")
        } else {
          message.error("create fail!")
        }
      }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  };
  