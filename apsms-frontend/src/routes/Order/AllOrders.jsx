import React from 'react'
import { connect } from 'dva';
import SearchContainer from '../../components/Mall/SearchContainer';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from "./AllOrders.less"
import AllOrders from "../../components/AllOrders/AllOrders"

export function Orders({history, dispatch, all_orders}) {
    let { 
        ordersList, 
        pagination
    } = all_orders
   
    const searchProps = {
        search(values) {
            let params = {
                name: values
            }
            pagination = {...pagination, ...params}
            dispatch({
                type: "all_orders/pullData",
                payload: 
                    pagination
            });
        }
    }

    const orderProps = {
        ordersList,
        pagination,
        changTablePagination(pagination) {
            pagination.pageNumber = pagination.current - 1
            dispatch({
                type: "all_orders/pullData",
                payload: 
                    pagination
            });
        },
        toPaied(order) {
            dispatch({
                type: "all_orders/toPaied",
                payload: order
            });
        },
        delivery(id) {
            dispatch({
                type: "all_orders/delivery",
                payload: {
                    id: id
                }
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

function mapStateToProps({ all_orders }) {
    return {all_orders};
}
  
export default connect(mapStateToProps)(Orders);
  