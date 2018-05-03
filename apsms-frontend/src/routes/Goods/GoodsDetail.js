import React from 'react'
import { connect } from 'dva';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from "./CreateGoods.less"
import Goods from "../../components/Mall/GoodsDetail"

export function GoodsDetail({history, dispatch, goods_detail}) {

    let { goodsDetail } = goods_detail
    const editProps = {
        goodsDetail
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
            <Goods {...editProps}/>
        </MainLayout>
    );
}

function mapStateToProps({ goods_detail }) {
    return {goods_detail};
}
  
export default connect(mapStateToProps)(GoodsDetail);
  