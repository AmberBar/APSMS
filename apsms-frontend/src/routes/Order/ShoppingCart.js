import React from 'react'
import { connect } from 'dva';
import SearchContainer from '../../components/Mall/SearchContainer';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from "./orders.less"
import Cart from "../../components/Order/ShoppingCart"

export function ShoppingCart({history, dispatch, shopping_cart}) {
    let { 
        ordersList, 
        pagination
    } = shopping_cart

    const cartProps = {
        ordersList,
        pagination,
        // changTablePagination(pagination) {
        //     pagination.pageNumber = pagination.current - 1
        //     dispatch({
        //         type: "goods/pullData",
        //         payload: 
        //             pagination
        //     });
        // },
        // delete(index) {
        //     let params = goodsList[index]
        //     dispatch({
        //         type: "goods/delete",
        //         payload: 
        //             params
        //     });
        // },
        // edit(index) {
        //     let params = goodsList[index]
        //     dispatch({
        //         type: "goods/edit",
        //         payload: 
        //             params.id
        //     }); 
        // }
    }
    

    const searchProps = {
        search(values) {
            let params = {
                name: values
            }
            pagination = {...pagination, ...params}
            dispatch({
                type: "goods/pullData",
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
                <Cart {...cartProps}/>
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ shopping_cart }) {
    return {shopping_cart};
}
  
export default connect(mapStateToProps)(ShoppingCart);
  