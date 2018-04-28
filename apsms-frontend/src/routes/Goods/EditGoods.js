import React from 'react'
import { connect } from 'dva';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from "./CreateGoods.less"
import EditOldGoods from "../../components/Goods/EditOldGoods"

export function EditGoods({history, dispatch, goods}) {

    let {goodsDetail} = goods
    const editProps = {
        goodsDetail,
        submit(values) {
            console.log("***************")
            console.log(values)
            // dispatch({
            //     type: "goods/createGoods",
            //     payload: values
            // });
        }
    }

    return(
        <MainLayout >
            <div className={styles.goods_container}>
                <EditOldGoods {...editProps}/>
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ goods }) {
    return {goods};
}
  
export default connect(mapStateToProps)(EditGoods);
  