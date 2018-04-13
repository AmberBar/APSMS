import { checkLogin } from "../services/user.js"

export default {

    namespace: 'login',
  
    state: {
      username: ''
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  
          // eslint-disable-line
          history.listen(location => {
            if (location.pathname == "/apsms") {
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
          
          // const result = checkLogin(payload.values)
          console.log("****************")
          console.log(result)
        }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  