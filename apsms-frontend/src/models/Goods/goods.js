import { createGoods, findAllGoods } from "../../services/goods.js"
import { setcookie } from "../../utils/common.js"
import { routerRedux } from 'dva/router';
import { message, Select } from "antd";

export default {

    namespace: 'goods',
  
    state: {
      goodsList: [],
      pagination: {
        
      }
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  
        history.listen(location => {
          if (location.pathname === "/goods") {
            dispatch({
              type: 'init',
              payload: {
                pagination: {
                  name: "",
                  pageNumber: 0,
                  pageSize: 2,
                }
              }
            });
          }
        });
      },
    },
  
    effects: {
        *init({ payload }, { call, put }) {

          // let params = payload
          // const result = yield call(findAllGoods, params);
          // if (result.data.success === true) {
          //   let goods = result.data.data.content
          //   console.log(result.data.data)
          //   let pagination = yield select(state=>state.goods.pagination)
          //   let params = {
              
          //   }
          //   yield put({
          //     type: "save",
          //     payload: {
          //       goodsList: goods
          //     }
          // });
          // } else {
          //   message.error(result.data.data)
          // }
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
          // let paginationCopy = {
          //   pageNumber: params.
          // }
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
        }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  };
  