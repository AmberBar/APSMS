import { getQueryString, parseQueryString } from "../../utils/common.js"
import { routerRedux } from 'dva/router';
import { message, Select } from "antd";
import { alipayReturn } from "../../services/alipay"

export default {

    namespace: 'alipay_return',
  
    state: {
       
    },
  
    subscriptions: {
      setup({ dispatch, history}) {  
        history.listen(location => {
            if (location.pathname === "/alipay/return") {
                let params = parseQueryString(window.location.href)
                console.log(params)
                dispatch({
                  type: 'return',
                  payload: params
                });
              }
        });
      },
    },
  
    effects: {
        *return({payload}, {put, call}) {
          let params = payload
          let result = yield call(alipayReturn, params);
          if (result.data.success) {
            yield put(routerRedux.push("/orders"))
          }
        }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  };
  