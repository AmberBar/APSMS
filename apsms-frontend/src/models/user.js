import { findAllUsers } from "../services/user.js"
import { setcookie } from "../utils/common.js"
import { routerRedux } from 'dva/router';
import { message } from "antd";

export default {

    namespace: 'user',
  
    state: {
      users: [],
      pagination: {
        "username": "",
        "pageNumber": 0,
        "pageSize": 2,
      }
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  
          // eslint-disable-line
          history.listen(location => {
            if (location.pathname === "/users") {
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
        *init({ payload }, { call, put, select }) { 
            let params = yield select(state=>state.user.pagination);
            const result = yield call(findAllUsers, params );
            if (result.data.success === true) {
                yield put({
                    type: "save",
                    payload: {
                      users: result.data.data.content
                    }
                });
                console.log("********user************")
                console.log(result.data.data)
                let pageParams = {
                  pageSize: result.data.data.pageSize,
                  pageNumber:  result.data.data.size,
                  total: result.data.data.totalElements,
                  current: Number(result.data.data.number) + 1
                }
                const pagination = yield select(state => state.user.pagination);
                pageParams = {...pageParams, ...pagination}
                yield put({
                  type: "save",
                  payload: {
                    pagination: pageParams
                  }
                })
            } else {
                message.error(result.data.data)
            }
        },
        *pullData({ payload }, { put, call, select }) {
          let params = {
            pageNumber: payload.current - 1
          }
          params = {...payload, ...params }
          const result = yield call(findAllUsers, params );
          if (result.data.success === true) {
            yield put({
                type: "save",
                payload: {
                  users: result.data.data.content
                }
            });
              console.log("********user************")
              console.log(result.data.data)
              let pageParams = {
                pageSize: result.data.data.size,
                pageNumber:  result.data.data.number,
                total: result.data.data.totalElements,
                current: Number(result.data.data.number) + 1
              }
           
              const pagination = yield select(state => state.user.pagination);
              pageParams = {...pagination, ...pageParams}
            
              yield put({
                type: "save",
                payload: {
                  pagination: pageParams
                }
              })
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
  