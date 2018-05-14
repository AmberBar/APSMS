import React from 'react'
import { connect } from 'dva';
import SearchContainer from '../../components/Mall/SearchContainer';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from "./orders.less"
import Cart from "../../components/Order/ShoppingCart"
import ConfirmButton from "../../components/Order/ConfirmButton"

export function ShoppingCart({history, dispatch, shopping_cart}) {
    let { 
        shoppingList, 
        pagination
    } = shopping_cart

    const cartProps = {
        shoppingList,
        pagination,
        changeGoodsNumber(id, values) {
            dispatch({
                type: "shopping_cart/updateNumber",
                payload: {
                    id: id,
                    number: values
                }
            })
        },
        submit(values) {
            dispatch({
                type: "shopping_cart/createOrder",
                payload: 
                    values
            });
        },
        delete(id) {
            dispatch({
                type: "shopping_cart/delete",
                payload: {
                    id: id
                }
            });
        },
        clearCart(values) {
            dispatch({
                type: "shopping_cart/clearCart",
                payload: {}
            });
        }
    }

    const searchProps = {
        search(values) {
            let params = {
                name: values
            }
            pagination = {...pagination, ...params}
            dispatch({
                type: "shopping_cart/pullData",
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
  