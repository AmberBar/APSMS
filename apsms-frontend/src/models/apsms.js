import { checkLogin } from "../services/user.js"
import { message } from "antd";
import { findAllGoods } from "../services/goods.js"

export default {

    namespace: 'apsms',
  
    state: {
      pagination: {},
      goodsList: []
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  
          history.listen(location => {
            if (location.pathname === "/apsms") {
              dispatch({
                type: 'init',
                payload: {
                  pagination: {
                    name: "",
                    pageNumber: 0,
                    pageSize: 6,
                  }
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
          payload: {
            pagination: payload.pagination
          }
        });
        yield put({
          type: "pullData",
          payload: payload.pagination
        });
      },
      *pullData({ payload }, { put, call, select }){
        let params = payload
        let pagination = yield select(state=>state.apsms.pagination)
        const result = yield call(findAllGoods, params);
        if (result.data.success === true) {
          let goods = result.data.data.content
          console.log(result.data.data)
          let params = {
            pageNumber: result.data.data.number,
            total: result.data.data.totalElements,
            current: Number(result.data.data.number) + 1,
          }
          pagination = {...pagination, ...params}
          yield put({
            type: "save",
            payload: {
              goodsList: goods,
              pagination: pagination
            }
        });
        } else {
          message.error(result.data.data)
        }
      },

    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
};
  