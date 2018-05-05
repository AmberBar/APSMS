import React, { Component } from 'react';
import {  Table, Button } from 'antd';
import { Link } from 'react-router-dom'
import * as moment from "moment"

class AllGoods extends Component {

    constructor(props) {
        super(props);

      this.state = {
        dataSource: [],
        pagination: {}
      }
    }
    
    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.props.changTablePagination(pager)
    }

    componentWillReceiveProps(next) {      
      this.setState({
        pagination: next.pagination,
        dataSource: next.ordersList
      });
    }

    render() {

      const shoppingListsColums = [
        {
          title: 'goods name',
          key: 'goods_name',
          render: (text, record, index) => (
            text.goods.name
          )
        }
        ,
        {
          title: 'number',
          dataIndex: 'number',
          key: 'number',
        }
        ,
        {
          title: 'total',
          dataIndex: 'sum',
          key: 'sum',
        }
      ]
      let count = 0
      const columns = [
        {
          title: 'order details',
          key: 'order details',
          render: (text, record, index) => (
                <Table 
                  dataSource={text.shoppingLists} 
                  columns={shoppingListsColums}
                  pagination={false}
                />
              )
        },

        {
          title: 'order id',
          dataIndex: 'id',
          key: 'id',
        }
        ,
        {
          title: 'createDate',
          key: 'createDate',
          render: (text, record, index) => (
            moment(text.createDate).format("YYYY-MM-DD")
          )
        }
        ,
        {
          title: 'status',
          key: 'status',
          dataIndex: "status"
        }
        ,
        {
          title: 'total',
          key: 'total',
          dataIndex: 'total'
        }
      ];
      
      return (
        <Table 
          dataSource={this.state.dataSource} 
          columns={columns}
          pagination={this.state.pagination}
          onChange={this.handleTableChange}
         />
      );
    }
}   

export default AllGoods;
