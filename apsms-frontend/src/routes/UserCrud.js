import React from 'react'
import { connect } from 'dva';
import Users from '../components/User/Users';
import MenuLayout from '../components/MainLayout/MenuLayout';
import SearchContainer from '../components/Mall/SearchContainer';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from "./UserCrud.less"


export function UserCrud({history, dispatch, user}) {

    const { users, pagination } = user

    const userProps = {
        users,
        pagination,
        changTablePagination(pagination) {
            dispatch({
                type: "user/pullData",
                payload: pagination
            });
        }
    }
    
    return(
        // 
        <MainLayout >
            <div className={styles.search_container}>
                <SearchContainer />
            </div>
            <div className={styles.users_container}>
                <Users {...userProps}/>
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ user }) {
    return {user};
}
  
export default connect(mapStateToProps)(UserCrud);
  