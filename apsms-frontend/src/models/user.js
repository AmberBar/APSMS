import { findAllUsers } from "../services/user.js"
import { setcookie } from "../utils/common.js"
import { routerRedux } from 'dva/router';
import { message } from "antd";
import { register, updateUser, deleteUser } from "../services/user.js"

export default {

    namespace: 'user',
  
    state: {
      users: [],
      pagination: {
        "username": "",
        "pageNumber": 0,
        "pageSize": 10,
      },
      showModal: false,
      index: -1,
      showCreateModal: false,
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
      },
      *registerUser({ payload }, { put, call }) {    
        const data = yield call(register, payload);
        if (data.data.success === true ) {    
          yield put({
            type: "save",
            payload: {
              users: [],
                pagination: {
                  "username": "",
                  "pageNumber": 0,
                  "pageSize": 10,
                },
                showModal: false,
                index: -1,
                showCreateModal: false,
            }
          });
          yield put({
            type: "init",
            payload: {
             
            }
          });
        } else {
          message.warn(data.data.data);
        }
      },
      *updateUser({ payload }, { put, call }) {    
        const data = yield call(updateUser, payload);
        if (data.data.success === true ) {
          
          yield put({
            type: "save",
            payload: {
              users: [],
                pagination: {
                  "username": "",
                  "pageNumber": 0,
                  "pageSize": 10,
                },
                showModal: false,
                index: -1,
                showCreateModal: false,
            }
          });
          yield put({
            type: "init",
            payload: {
             
            }
          });
        } else {
          message.warn(data.data.data);
        }
      },
      *deleteUserById({ payload }, { put, call } ) {
        const data = yield call(deleteUser, payload);
        if (data.data.success === true ) {
          
          yield put({
            type: "save",
            payload: {
              users: [],
                pagination: {
                  "username": "",
                  "pageNumber": 0,
                  "pageSize": 10,
                },
                showModal: false,
                index: -1,
                showCreateModal: false,
            }
          });
          yield put({
            type: "init",
            payload: {
             
            }
          });
          message.success(data.data.data);
        } else {
          message.error(data.data.data);
        }
      }
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  