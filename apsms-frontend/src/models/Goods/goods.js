import { createGoods, findAllGoods, deleteData, getGoods} from "../../services/goods.js"
import { getQueryString } from "../../utils/common.js"
import { routerRedux } from 'dva/router';
import { message, Select } from "antd";

export default {

    namespace: 'goods',
  
    state: {
      goodsList: [],
      pagination: {},
      goodsDetail: {},
    },
  
    subscriptions: {
      setup({ dispatch, history}) {  
        history.listen(location => {
          if (location.pathname === "/goods") {
            dispatch({
              type: 'init',
              payload: {
                pagination: {
                  name: "",
                  pageNumber: 0,
                  pageSize: 10,
                }
              }
            });
          }

          if (location.pathname === "/goods/edit") {
            let id = getQueryString("id", location)
            dispatch({
              type: 'findOne',
              payload: {
                id: id
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
          let pagination = yield select(state=>state.goods.pagination)
          const result = yield call(findAllGoods, params);
          if (result.data.success === true) {
            let goods = result.data.data.content
            console.log(result.data.data)
            let params = {
              pageNumber: result.data.data.number,
              total: result.data.data.totalElements,
              current: result.data.data.number + 1,
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
        *createGoods({ payload }, { put, call }) {
          const result = yield call(createGoods  , payload);
          if (result.data.success === true) {
            console.log(result.data.data)
            yield put(routerRedux.push('/goods'));
          } else {
            message.error(result.data.data)
          }
        },
        *delete({ payload }, { put, call }) {
          const result = yield call(deleteData, payload);
          if (result.data.success === true) {
            message.success(result.data.data)
            yield put(routerRedux.push('/goods'));
          } else {
            message.error(result.data.data)
          }
        },
        *findOne({ payload }, { put, call }) {
          let result = yield call(getGoods, payload)
          if (result.data.success === true) {
            console.log("///////////////////")
            console.log(result.data.data)
            yield put({
              type: "save",
              payload: {
                goodsDetail: result.data.data
              }
            })
            // yield put(routerRedux.push('/goods'));
          } else {
            message.error(result.data.data)
          }
        },
        *edit({ payload }, { put, call }) {
          // yield put(routerRedux.push('/goods/edit', {id: payload}));
        }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  };
  