import React, { Component } from 'react';
import styles from './Users.less'
import { Link } from 'react-router-dom'
import { Table, Input, Icon} from 'antd';

const Search = Input.Search;

class Users extends Component {

    constructor(props) {
      super(props);

      this.state = {
        dataSource: this.props.users,
        pagination: {

        }
      }
    }

    componentWillReceiveProps(next) {
      console.log(next.users)
      let list= next.users;
      for (let i = 0; i < list.length; i ++) {
          if (list[i].admin) {
            list[i].admin = true + ""
          } else {
            list[i].admin = false + ""
          }
      }
    
      this.setState({
        pagination: next.pagination,
        dataSource: list
      });
    }

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.props.changTablePagination(pager)
      console.log("BBBBBBBBBBBBBBBBBB")
      console.log(pager)
    }
    
    render() {      
      const columns = [{
        title: 'name',
        dataIndex: 'username',
        key: 'username',
      }, 
      {
        title: 'register_date',
        dataIndex: 'regDate',
        key: 'regDate',
      }, 

      {
        title: 'phone',
        dataIndex: 'phone',
        key: 'phone',
      }, 
      
      {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
      },
      
      {
        title: 'is_admin',
        dataIndex: 'admin',
        key: 'admin',
      },

      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Edit</a>
            &nbsp;
            <a href="javascript:;">Delete</a>
            
          </span>
        ),
      }
    ];
    console.log("><???????????<>>>>>>>>>>>>>>>>>>>>>>")
    console.log(this.state.pagination)
      return (
        <div id="users_container">
            <Table 
              dataSource={this.state.dataSource}
              columns={columns}
              pagination={this.state.pagination}
              onChange={this.handleTableChange}
            />
        </div>
      );
    }
}

export default Users;