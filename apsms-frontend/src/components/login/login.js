import React, { Component } from 'react';
import {  Form, Input, Button, Checkbox  } from 'antd';

const FormItem = Form.Item;

class Login extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit() {
        console.log(this.props.form.getFieldsValue());
    }

    render() {
        let { getFieldProps } = this.props.form;

        return (
          <Form inline onSubmit={() => this.handleSubmit()}>
            <FormItem
              label="账户"
            >
              <Input placeholder="请输入账户名"
                {...getFieldProps('name')}
              />
            </FormItem>
            <FormItem
              label="密码"
            >
              <Input type="password" placeholder="请输入密码"
                {...getFieldProps('password')}
              />
            </FormItem>
            <FormItem>
              <Checkbox {...getFieldProps('agreement')}>记住我</Checkbox>
            </FormItem>
            <Button type="primary" htmlType="submit">登录</Button>
          </Form>
        );
    }
}   

Login = Form.create()(Login);

export default Login;
