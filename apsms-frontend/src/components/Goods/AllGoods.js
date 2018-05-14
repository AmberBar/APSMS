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

    handleDelete(index) {
      this.props.delete(index)
    }

    indexData(index) {
      this.props.edit(index)
    }

    render() {
      const columns = [
      {
        title: 'imgs',
        key: 'imgs',
        width: "10%",
        render: (text, record, index) => (
          text.imgs.length != 0? <img className={styles.img} src={text.imgs[0].name} /> : "no img"       
        ),
      },  
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: "30%"
      }, 
      {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
        width: "10%",
      }, 
      
      {
        title: 'brand',
        dataIndex: 'brand',
        key: 'brand',
        width: "10%",
      },

      {
        title: 'type',
        dataIndex: 'type',
        key: 'type',
        width: "10%",
      },

      {
        title: 'createDate',
        dataIndex: 'createDate',
        width: "10%",
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
            <Link to={"goods/edit?id=" + this.state.dataSource[index].id}>
              <Button type="primary" size="small" >Edit</Button>
            </Link>
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
