import { createGoods } from "../../services/goods.js"
import { setcookie } from "../../utils/common.js"
import { routerRedux } from 'dva/router';
import { message } from "antd";

export default {

    namespace: 'goods',
  
    state: {

    },
  
    subscriptions: {
      setup({ dispatch, history }) {  
        
      },
    },
  
    effects: {
        *init({ payload }, { call, put }) {   
            yield put({
                type: "save",
                payload: {}
            });
        },
        *createGoods({ payload }, { put, call }) {
          const result = yield call(createGoods  , payload);
          if (result.data.success === true) {
            console.log(result.data.data)
            // yield put(routerRedux.push('/apsms'));
            // yield call(setcookie, "user" ,result.data.data)
            //把用户信息放到cookies
          } else {
            // message.error(result.data.data)
          }
        }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  