import { getQueryString } from "../../utils/common.js"
import { routerRedux } from 'dva/router';
import { message, Select } from "antd";
import { alipay } from "../../services/alipay"

export default {

    namespace: 'alipay',
  
    state: {
        fromData: {}
    },
  
    subscriptions: {
      setup({ dispatch, history}) {  
        history.listen(location => {
            if (location.pathname === "/alipay") {
                let out_trade_no = getQueryString("out_trade_no", location)
                let total_amount = getQueryString("total_amount", location)
                let subject = getQueryString("subject", location)
                dispatch({
                  type: 'alipay',
                  payload: {
                    out_trade_no,
                    total_amount,
                    subject
                  }
                });
            }

         
        });
      },
    },
  
    effects: {
        *alipay({payload}, {put, call}) {
            let params = payload
            let result = yield call(alipay, params);
            console.log(result.data)
            yield put({
                type: 'save',
                payload: {
                    fromData: result.data
                }
            })
        },
       
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  };
  