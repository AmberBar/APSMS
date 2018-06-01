import React from 'react'
import { connect } from 'dva';
import MenuLayout from '../components/MainLayout/MenuLayout';
import SearchContainer from '../components/Mall/SearchContainer';
import MainLayout from '../components/MainLayout/MainLayout';
import GoodsContainer from '../components/Mall/GoodsContainer';
import styles from "./Apsms.less"

export function Apsms({ app ,history, dispatch, apsms}) {
    let { goodsList, pagination } = apsms
    const apsmaProps = {
        goodsList,
        pagination,
        changTablePagination(pagination) {
            pagination.pageNumber = pagination.current - 1
            dispatch({
                type: "apsms/pullData",
                payload: 
                    pagination
            });
        },
    }

    const searchProps = {
        search(values) {
            let params = {
                name: values
            }
            pagination = {...pagination, ...params}
            dispatch({
                type: "apsms/pullData",
                payload: 
                    pagination
            });
        }
    }

    console.log(app)
    // let { user } = app
    // const mainLayOutProps = {
        
    // }
    
    return(
        <MainLayout >
            <div className={styles.search_container}>
                <SearchContainer { ...searchProps}/>
            </div>
            <div className={styles.goods_container}>
                <GoodsContainer {...apsmaProps}/>
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ apsms }) {
    return {apsms};
}
  
export default connect(mapStateToProps)(Apsms);
  