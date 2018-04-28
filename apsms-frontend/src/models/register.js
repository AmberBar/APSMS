import { register } from "../services/user.js"
import { routerRedux } from 'dva/router';
import { connectAdvanced } from "react-redux";
import { message } from 'antd';

export default {

    namespace: 'register',
  
    state: {
      username: ''
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  
          // eslint-disable-line
          history.listen(location => {
            if (location.pathname === "/register") {
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
        },

        *registerUser({ payload }, { put, call }) {    
          const data = yield call(register, payload);
          if (data.data.success === true ) {
            yield put(routerRedux.push('/apsms'));
          } else {
            message.warn(data.data.data);
          }
        }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  