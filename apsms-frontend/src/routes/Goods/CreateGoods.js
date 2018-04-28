import React from 'react'
import { connect } from 'dva';
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from "./CreateGoods.less"
import CreateNewGoods from "../../components/Goods/CreateNewGoods"

export function CreateGoods({history, dispatch, goods}) {

    const createProps = {
        submit(values) {
            console.log("***************")
            console.log(values)
            dispatch({
                type: "goods/createGoods",
                payload: values
            });
        }
    }
    console.log(goods)
    return(
        <MainLayout >
            <div className={styles.goods_container}>
                <CreateNewGoods {...createProps}/>
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ goods }) {
    return {goods};
}
  
export default connect(mapStateToProps)(CreateGoods);
  