import React from 'react'
import { connect } from 'dva';
import MenuLayout from '../components/MainLayout/MenuLayout';
import SearchContainer from '../components/Mall/SearchContainer';
import MainLayout from '../components/MainLayout/MainLayout';
import GoodsContainer from '../components/Mall/GoodsContainer';
import styles from "./Apsms.less"

export function Apsms({history, dispatch, apsms}) {
    const registerProps = {
      
    }
    
    return(
        <MainLayout >
            <div className={styles.search_container}>
                <SearchContainer />
            </div>
            <div className={styles.goods_container}>
                <GoodsContainer />
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ apsms }) {
    return {apsms};
}
  
export default connect(mapStateToProps)(Apsms);
  