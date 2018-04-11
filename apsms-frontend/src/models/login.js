
export default {

    namespace: 'login',
  
    state: {},
  
    subscriptions: {
      setup({ dispatch, history }) {  
          // eslint-disable-line
          history.listen(location => {
            if (location.pathname == "/apsms") {
              dispatch({
                type: 'init',
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
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  