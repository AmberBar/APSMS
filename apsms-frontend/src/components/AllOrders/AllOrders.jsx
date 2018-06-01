import React, { Component } from 'react';
import {  Table, Button, Icon } from 'antd';
import { Link } from 'react-router-dom'
import * as moment from "moment"
import styles from "./AllOrders.less"

class AllOrders extends Component {

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

    handlePaied = (text) => {
      this.props.toPaied(text)
    }

    handleDelivery = (text) => {
      console.log(text)
      this.props.delivery(text.id)
    }

    render() {
      const shoppingListsColums = [
        {
          title: 'goods imgs',
          key: 'imgs',
          width: "5%",
          render: (text, record, index) => (
            text.goods.imgs.length != 0? <img className={styles.img} src={text.goods.imgs[0].name} /> : "no img"       
          ),
        }
        , 
        {
          title: 'goods name',
          key: 'goods_name',
          width: "10%",
          render: (text, record, index) => (
            text.goods.name
          )
        }
        ,
        {
          title: 'number',
          dataIndex: 'number',
          key: 'number',
          width: "5%",
        }
        ,
        {
          title: 'total',
          dataIndex: 'sum',
          key: 'sum',
          width: "5%",
        }
      ]
      let count = 0
      const columns = [
        {
          title: 'order details',
          key: 'order details',
          width: '50%',
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
          width: '9%',
        }
        ,
        {
          title: 'createDate',
          key: 'createDate',
          width: '10%',
          render: (text, record, index) => (
            moment(text.createDate).format("YYYY-MM-DD")
          )
        }
        ,
        {
          title: 'status',
          key: 'status',
          dataIndex: "status",
          width: '10%',
        }
        ,
        {
          title: 'total',
          key: 'total',
          dataIndex: 'total',
          width: '10%',
        }
        ,
        {
          title: 'action',
          key: 'action',
          width: '30%',
          render: (text, record, index) => (
            <Action status={text.status} handlePaied={() => this.handlePaied(text)}
            handleDelivery={() => this.handleDelivery(text)}
            />
          )
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

export default AllOrders;

export class　Action extends Component{
  
  constructor(props) {
    super(props);
  }

  handlePaied = () => {
    this.props.handlePaied();
  }

  handleDelivery = () => {
    this.props.handleDelivery();
  }

  render() {

    switch(this.props.status)
      {
        case "obligations":
          return (
            <div>
                obligation
            </div>
          );
          break;
        case "paid":
          return (
            <div>
              <Button onClick={this.handleDelivery}>
                  delivery
              </Button>
            </div>
          );
          break;
        case "deliveried": 
          return(
            <div >
              deliveried
            </div>
          );
          break;
        default: 
          return (
            <div></div>
          );
      }
  }
}
