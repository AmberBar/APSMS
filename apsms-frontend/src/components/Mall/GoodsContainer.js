import React, { Component } from 'react';
import styles from './GoodsContainer.less'
import { Link } from 'react-router-dom'
import { List, Avatar, Icon, Button, Card} from 'antd';

const { Meta } = Card

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
                         <Card
                          hoverable
                          style={{ width: 300 , "margin-left": 30}}
                          cover={
                            <div classsName={styles.goods_imgs}>
                              <img alt="goods_imgs" src={goods.imgs[0].name} />
                            </div>
                          }
                        >
                          <Meta
                            style={{ height: 80}}
                            title={goods.price}
                            description={goods.name}
                          />
                        </Card>
                     </List.Item>
                   </Link>
                   )}
                 />
              
            </div>
      );
    }
}

export default GoodsContainer;