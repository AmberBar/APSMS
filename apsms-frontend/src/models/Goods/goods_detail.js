import { getGoods} from "../../services/goods.js"
import { getQueryString } from "../../utils/common.js"
import { routerRedux } from 'dva/router';
import { message, Select } from "antd";
import { addGoodsToCart, buyNow} from "../../services/shoppingCart.js"

export default {

    namespace: 'goods_detail',
  
    state: {
      goodsList: [],
      pagination: {},
      goodsDetail: {},
      shoppingList: []
    },
  
    subscriptions: {
      setup({ dispatch, history}) {  
        history.listen(location => {
          if (location.pathname === "/apsms/detail") {
            let id = getQueryString("id", location)
            dispatch({
              type: 'findOne',
              payload: {
                id: id
              }
            });
          }
        });
      },
    },
  
    effects: {
        *findOne({ payload }, { put, call }) {
          let result = yield call(getGoods, payload)
          if (result.data.success === true) {
            yield put({
              type: "save",
              payload: {
                goodsDetail: result.data.data
              }
            })
          } else {
            message.error(result.data.data)
          }
        },
        *addGoodsToCart({ payload }, { put, call }) {
          console.log(payload)
          let result = yield call(addGoodsToCart, payload)
          if (result.data.success === true) {
            message.success(result.data.data)
          } else {
            message.error(result.data.data)
          } 
        },
        *buyNowCart({ payload }, { put, call }) {
          console.log(payload)
          let result = yield call(buyNow, payload)
          if (result.data.success === true) {
            let shoppingList = result.data.data
            yield put(routerRedux.push("/order/confirm?id=" + shoppingList.id))
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
  