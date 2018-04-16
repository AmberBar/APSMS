import React from 'react'
import { connect } from 'dva';
import Users from '../components/User/Users';
import MenuLayout from '../components/MainLayout/MenuLayout';
import SearchContainer from '../components/Mall/SearchContainer';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from "./UserCrud.less"
import CreateModal from '../components/User/CreateModal';
import EditModal from "../components/User/EditModal"
import {Button} from "antd"

// let index = -1;
export function UserCrud({history, dispatch, user}) {

    let { users, pagination , showModal, index, showCreateModal} = user
    
    const searchProps = {
        username: pagination.username,
        search(values) {
            let params = {
                username: values
            }
            pagination = {...pagination, ...params}
            dispatch({
                type: "user/pullData",
                payload: pagination
            });
        }
    }

    const userProps = {
        users,
        pagination,
        showModal,
        changTablePagination(pagination) {
            dispatch({
                type: "user/pullData",
                payload: pagination
            });
        },
        
        editUser(idx) {
            index = idx
            dispatch({
                type: 'user/save',
                payload: {
                    showModal: !showModal,
                    index: idx
                }
            });
        }
    }

    const modalProps = {
        showCreateModal,
        submit(values) {
            delete values.confirm
            // dispatch({
            //     type: "user/save",
            //     payload: {
            //         showCreateModal: false
            //     }
            // });
            dispatch({
                type: 'user/registerUser',
                payload: values
            });    
        },
        changeCreateModal(params) {
            dispatch({
                type: "user/save",
                payload: {
                    showCreateModal: params
                }
            });
        }
    }

    const editModalProps = {
        index,
        users,
        showModal,
        submit(values) {
            delete values.confirm
            dispatch({
                type: 'user/updateUser',
                payload: values
            });
        },
    }
    
    return(
        <MainLayout >
            <div className={styles.search_container}>
                <SearchContainer {...searchProps}/>            
            </div>
            <div className={styles.users_container}>
                <Users {...userProps}/>
                <CreateModal  {...modalProps}/>
                <EditModal {...editModalProps}/> 
            </div>
        </MainLayout>
    );
}


function mapStateToProps({ user }) {
    return {user};
}
  
export default connect(mapStateToProps)(UserCrud);
  