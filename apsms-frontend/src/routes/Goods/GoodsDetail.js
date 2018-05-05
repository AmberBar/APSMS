import React from 'react'
import { connect } from 'dva'
import MainLayout from '../../components/MainLayout/MainLayout'
import Goods from "../../components/Mall/GoodsDetail"

export function GoodsDetail({history, dispatch, goods_detail}) {

    let { goodsDetail } = goods_detail

    const detailProps = {
        goodsDetail,
        addCard(number) {
            let params = {
                goods: goodsDetail,
                number: number
            }
            dispatch({
                type: "goods_detail/addGoodsToCart",
                payload: params
            })
        },
        buyNow(number) {
            let params = {
                goods: goodsDetail,
                number: number
            }
            dispatch({
                type: "goods_detail/buyNowCart",
                payload: params
            })
        }
        // submit(values) {
        //     console.log("***************")
        //     console.log(values)
        //     dispatch({
        //         type: "goods_detail/edit",
        //         payload: values
        //     });
        // }
    }

    return(
        <MainLayout >
            <Goods {...detailProps}/>
        </MainLayout>
    );
}

function mapStateToProps({ goods_detail }) {
    return {goods_detail};
}
  
export default connect(mapStateToProps)(GoodsDetail);
  