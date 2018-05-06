import React from 'react'
import { connect } from 'dva';
import SearchContainer from '../../components/Mall/SearchContainer';
import MainLayout from '../../components/MainLayout/MainLayout';
import GoodsContainer from '../../components/Mall/GoodsContainer';
import styles from "./orders.less"
import AllOrders from "../../components/Order/Orders"

export function Orders({history, dispatch, orders}) {
    let { 
        ordersList, 
        pagination
    } = orders

    const orderProps = {
        ordersList,
        pagination,
        changTablePagination(pagination) {
            pagination.pageNumber = pagination.current - 1
            dispatch({
                type: "orders/pullData",
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
                type: "orders/pullData",
                payload: 
                    pagination
            });
        }
    }

    return(
        <MainLayout >
            <div className={styles.search_container}>
                <SearchContainer {...searchProps}/>
            </div>
            <div className={styles.goods_container}>
                <AllOrders {...orderProps}/>
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ orders }) {
    return {orders};
}
  
export default connect(mapStateToProps)(Orders);
  