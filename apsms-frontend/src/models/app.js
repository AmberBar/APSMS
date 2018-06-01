import { findAllUsers } from "../services/user.js"
import { setcookie } from "../utils/common.js"
import { routerRedux } from 'dva/router';
import { message } from "antd";
import { getUserInfo } from "../services/user.js"

export default {

    namespace: 'app',
  
    state: {
      user: {}
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  
        // history.listen(location => {
        //     if (location.pathname === "/") {
        //       dispatch({
        //         type: 'init',
        //         payload: {

        //         }
        //       });
        //     }
        // });
      },
    },
  
    effects: {
        *init({ payload }, { call, put, select }) { 
            alert("进入")
            let result = yield call(getUserInfo)
            if (result.data.success) {
                console.log("///////////////")
                console.log(result.data.data)
                console.log("//////////////////////////")
                yield put({
                    type: 'save',
                    payload: {
                        user: result.data.data
                    }
                })
            }
        },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  