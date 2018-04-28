import React, { Component } from 'react';
import styles from './Users.less'
import { Link } from 'react-router-dom'
import { register } from '../../services/user';
import Register from "../login/Register"
import CreateModal from './CreateModal';
import * as moment from "moment"
import {Table, Modal, Form, Switch, Input, Select, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const Search = Input.Search;

class Users extends Component {

    constructor(props) {
      super(props);

      this.state = {
        dataSource: this.props.users,
        pagination: {

        },
        editVisible: false,
        confirmDirty: false,
        autoCompleteResult: [],
      }
    }

    componentWillReceiveProps(next) {
      let users = next.users
      for (let i = 0; i < users.length; i ++) {
        users[i].regDate = moment(users[i].regDate).format("YYYY-MM-DD")
      }
      
      this.setState({
        pagination: next.pagination,
        dataSource: users
      });
    }

    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.props.changTablePagination(pager)
    }

    setModal2Visible = () => {
      this.setState({
        editVisible: !this.state.editVisible
      });
    }

    indexData (idx)  {
      this.props.editUser(idx)
    }
    handleDelete(idx) {
      this.props.delete(idx);
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
  
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));

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
        title: 'role',
        key: 'roles.name',
        render: (text, record, index) => (
          text.roles.map((role) => {
            return (
              <span>
              {role.name} ;
            </span>
            )
          })
          
        ),
      },

      {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => (
          <span>
              <Button type="primary" onClick={() => this.indexData(index)}>Edit</Button>
              <Button type="primary" onClick={() => this.handleDelete(index)}>Delete</Button>
          </span>
        ),
      }
    ];

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

Users = Form.create()(Users);

export default Users;