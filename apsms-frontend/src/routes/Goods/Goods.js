import React from 'react'
import { connect } from 'dva';
import SearchContainer from '../../components/Mall/SearchContainer';
import MainLayout from '../../components/MainLayout/MainLayout';
import GoodsContainer from '../../components/Mall/GoodsContainer';
import styles from "./Goods.less"
import AllGoods from "../../components/Goods/AllGoods"

export function Goods({history, dispatch, goods}) {
    const registerProps = {
      
    }
    
    return(
        <MainLayout >
            <div className={styles.search_container}>
                <SearchContainer />
            </div>
            <div className={styles.goods_container}>
                <AllGoods />
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ goods }) {
    return {goods};
}
  
export default connect(mapStateToProps)(Goods);
  