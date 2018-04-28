import React, { Component } from 'react';
import {  Table, Button } from 'antd';
import styles from './AllGoods.less'
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
        dataSource: next.goodsList
      });
    }

    render() {
      const columns = [
      {
        title: 'imgs',
        key: 'imgs',
        render: (text, record, index) => (
          text.imgs.length != 0? <img className={styles.img} src={text.imgs[0].name} /> : "no img"       
        ),
      },  
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
      }, 
      {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
      }, 
      
      {
        title: 'brand',
        dataIndex: 'brand',
        key: 'brand',
      },

      {
        title: 'type',
        dataIndex: 'type',
        key: 'type',
      },

      {
        title: 'createDate',
        dataIndex: 'createDate',
        render: (text, record, index) => (
          <span>
          {moment(text.createDate).format("YYYY-MM-DD")}
          </span>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => (
          <span>
            <Button type="primary" size="small" onClick={() => this.indexData(index)}>Edit</Button>
            <Button type="primary" size="small" className={styles.action_button} size="small" onClick={() => this.handleDelete(index)}>Delete</Button>
          </span>
        ),
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
