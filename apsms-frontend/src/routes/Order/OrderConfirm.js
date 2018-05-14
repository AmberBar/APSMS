import React from 'react'
import { connect } from 'dva';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from "./OrderConfirm.less"
import Order from "../../components/Order/OrderConfirm"

export function OrderConfirm({history, dispatch, order_confirm}) {

    let { shoppingList , addresses} = order_confirm

    let orderConfirmProps = {
        shoppingList,
        addresses,
        submit(param) {
            dispatch({
                type: "order_confirm/createOrder",
                payload: param
            })
        }
    }

    return(
        <MainLayout >
            <div className={styles.goods_container}>
                <Order {...orderConfirmProps}/>
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ order_confirm }) {
    return {order_confirm};
}
  
export default connect(mapStateToProps)(OrderConfirm);
  