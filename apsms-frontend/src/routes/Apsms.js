import React from 'react'
import { connect } from 'dva';
import MenuLayout from '../components/MainLayout/MenuLayout';
import SearchContainer from '../components/Mall/SearchContainer';
import MainLayout from '../components/MainLayout/MainLayout';
import GoodsContainer from '../components/Mall/GoodsContainer';
import styles from "./Apsms.less"

export function Apsms({history, dispatch, apsms}) {
    let { goodsList, pagination } = apsms
    const apsmaProps = {
        goodsList,
        pagination,
        changTablePagination(pagination) {
            pagination.pageNumber = pagination.current - 1
            dispatch({
                type: "apsms/pullData",
                payload: 
                    pagination
            });
        },
    }

    const searchProps = {
        search(values) {
            let params = {
                name: values
            }
            pagination = {...pagination, ...params}
            dispatch({
                type: "apsms/pullData",
                payload: 
                    pagination
            });
        }
    }
    
    return(
        <MainLayout >
            <div className={styles.search_container}>
                <SearchContainer { ...searchProps}/>
            </div>
            <div className={styles.goods_container}>
            <a href="tencent://message/?uin=949144210"><img border="0" src="http://img.bimg.126.net/photo/sE76_-8lNVUr1d6N-SZ_dQ==/2565644412717916539.jpg" alt="点击这里给我发消息"/></a>
                <GoodsContainer {...apsmaProps}/>
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ apsms }) {
    return {apsms};
}
  
export default connect(mapStateToProps)(Apsms);
  