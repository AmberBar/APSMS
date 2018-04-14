import { checkLogin } from "../services/user.js"
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
            if (location.pathname === "/apsms") {
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
  