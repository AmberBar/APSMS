import React, { Component } from 'react';
import styles from './GoodsContainer.less'
import { Link } from 'react-router-dom'
import { List, Avatar, Icon, Button} from 'antd';

class GoodsContainer extends Component {

    constructor(props) {
      super(props);

      this.state = {
        goodsList: [],
        pagination: {},
        grid: { column: 3 }
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.goodsList.length <= 2) {
        this.setState({
          goodsList: nextProps.goodsList,
          pagination: nextProps.pagination,
          grid: { column: 2 }
        })
      } else {
        this.setState({
          goodsList: nextProps.goodsList,
          pagination: nextProps.pagination,
          grid: { column: 3 }
        })
      }
    }

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination;
      this.setState({
        pagination: pager,
      });
      this.props.changTablePagination(pager)
    }

    render() {
      const IconText = ({ type, text }) => (
        <span>
          <Icon type={type} style={{ marginRight: 8 }} />
          {text}
        </span>
      );

      let {goodsList} = this.state

      console.log("************")
      console.log(goodsList)
      console.log("************")

      let params = {
        onChange: this.handleTableChange
      }
      let paginationParam = this.state.pagination
      params = { ...params, ...paginationParam}
      
      return (
            <div>

              <List
                 dataSource={this.state.goodsList}
                 grid={this.state.grid}
                 pagination={params}
                 renderItem={goods => (
                   <Link to={"/apsms/detail?id=" + goods.id}>
                     <List.Item
                     >
                       <div id="goods_detail_container">
                         <div className={styles.img_container}>
                           <img src={goods.imgs[0].name}/>
                         </div>
                         <div className={styles.shopping_container}>
                           <div className={styles.div_01}>
                             <label className={styles.price}>
                               ${goods.price}
                             </label>
                             <label className={styles.count}>
                               已出售: 10000
                             </label>
                           </div>
                           <label className={styles.name}>
                             {goods.name}
                           </label>
                         </div>
                       </div>
                     </List.Item>
                   </Link>
                   )}
                 />
              
            </div>
      );
    }
}

export default GoodsContainer;