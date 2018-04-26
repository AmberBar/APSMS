import React, { Component } from 'react';
import {  Form, Input, Button, Checkbox  , Icon} from 'antd';
import styles from './login.less'
import { Link } from 'react-router-dom'

const FormItem = Form.Item;

class Login extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.submit(values);
        }
      });
    }

    hasErrors(fieldsError) {
      return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div id="login_container">
          <div className={styles.login_form_container}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <a className="login-form-forgot" href="/register">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or &nbsp;
                <Link to="/register" className="login-form-forgot">
                  register now!
                </Link>
              </FormItem>
            </Form>
          </div>
        </div>
      );
    }
}   

Login = Form.create()(Login);

export default Login;
