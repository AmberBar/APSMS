import { checkLogin } from "../services/user.js"
import { setcookie, localStorageService } from "../utils/common.js"
import { routerRedux } from 'dva/router';
import { message } from "antd";

export default {

    namespace: 'login',
  
    state: {
      username: ''
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  
          // eslint-disable-line
          history.listen(location => {
            if (location.pathname === "/login") {
              dispatch({
                type: 'init',
                payload: {

                }
              });
            }
          });
      },
    },
  
    effects: {
        *init({ payload }, { call, put }) {   
            yield put({
                type: "save",
                payload: {}
            });
        },
        *checkLogin({ payload }, { put, call }) {
          const result = yield call(checkLogin  , payload.values);
          if (result.data.success === true) {
            localStorageService.setItem("user", result.data.data);
            
            yield put(routerRedux.push('/apsms'));
          //  yield call(setcookie, "user" ,result.data.data)
            //把用户信息放到cookies
          
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
  