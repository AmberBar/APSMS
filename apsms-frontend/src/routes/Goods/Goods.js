import React from 'react'
import { connect } from 'dva';
import SearchContainer from '../../components/Mall/SearchContainer';
import MainLayout from '../../components/MainLayout/MainLayout';
import GoodsContainer from '../../components/Mall/GoodsContainer';
import styles from "./Goods.less"
import AllGoods from "../../components/Goods/AllGoods"

export function Goods({history, dispatch, goods}) {
    let { goodsList , pagination} = goods

    const goodsProps = {
        goodsList,
        pagination,
        changTablePagination(pagination) {
            pagination.pageNumber = pagination.current - 1
            dispatch({
                type: "goods/pullData",
                payload: 
                    pagination
            });
        },
        delete(index) {
            let params = goodsList[index]
            dispatch({
                type: "goods/delete",
                payload: 
                    params
            });
        },
        edit(index) {
            let params = goodsList[index]
            dispatch({
                type: "goods/edit",
                payload: 
                    params.id
            }); 
        },
        changeStock(id, values) {
            dispatch({
                type: "goods/changeStock",
                payload: {
                    stock: values,
                    id: id
                }
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
                <AllGoods {...goodsProps}/>
            </div>
        </MainLayout>
    );
}

function mapStateToProps({ goods }) {
    return {goods};
}
  
export default connect(mapStateToProps)(Goods);
  