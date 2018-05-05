
import { routerRedux } from 'dva/router';
import { message } from "antd";
import { register, updateUser, deleteUser } from "../../services/user.js"

export default {

    namespace: 'personal_information',
  
    state: {

    },
  
    subscriptions: {
      setup({ dispatch, history }) {  
          // eslint-disable-line
          history.listen(location => {
            if (location.pathname === "/personal/information") {
              dispatch({
                type: 'findOne',
                payload: {

                }
              });
            }
          });
      },
    },
  
    effects: {
      *updateUser({ payload }, { put, call }) {    
        const data = yield call(updateUser, payload);
        if (data.data.success === true ) {
 
        } else {
          message.warn(data.data.data);
        }
      },
      *findOne({ payload }, { put, call }) {
        
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  