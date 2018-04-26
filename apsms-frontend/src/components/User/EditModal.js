import { Component } from "react";
import styles from "./EditModal.less"
import {Modal, Tree, Form, Switch, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const TreeNode = Tree.TreeNode;
let rolesArray = []
class EditModal extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
          confirmDirty: false,
          autoCompleteResult: [],
          editVisible: false
        }
      }
  
      handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let params = []
            for (let i = 0 ; i < rolesArray.length; i ++) {
                let role = {
                    "name": rolesArray[i]
                }
                params.push(role)
            }
            values.roles = params
            this.props.submit(values);
          //  console.log('Received values of form: ', values);
          }
        });
      }

      ChangeAdmin = (checked) => {
        console.log(`switch to ${checked}`);
      }
      handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      }
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      }
      validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }

      onCheck= (checkedKeys, info) => {
        console.log(checkedKeys)
        rolesArray = checkedKeys
      }

      setModal2Visible() {
          this.setState({
              editVisible: !this.state.editVisible
          });
      }  


    componentWillReceiveProps(next) {
        this.setState({
            editVisible: next.showModal
        });
    }
  
      render() {
        let {index, users } = this.props;
       
        if (index < 0 ) {
            return(<div></div>);
        }
        let text = users[index]
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

        return(
            <div>
                <Modal
                title="Create or Edit User"
                wrapClassName="vertical-center-modal"
                visible={this.state.editVisible}
                onOk={() => this.setModal2Visible(false)}
                onCancel={() => this.setModal2Visible(false)}
                >   
               <p>
                <Form onSubmit={() => this.handleSubmit()}>
                  <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                        Username&nbsp;
                        </span>
                    )}
                    >
                    {getFieldDecorator('username', {
                        rules: [{ required: false, message: 'Please input your username!', whitespace: true }],
                        initialValue: text.username
                    })(  
                      <Input disabled="true"/>
                      
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                        password&nbsp;
                        </span>
                    )}
                    >
                    {getFieldDecorator('password', {
                        rules: [{ required: false, message: 'Please input your username!', whitespace: true }],
                        initialValue: text.password
                    })(  
                      // <Input disabled="true"/>
                      <div></div>
                    )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="roles"
                    >
                    {getFieldDecorator('roles', {
                        rules: [
                            {
                                type: "array"
                            },
                        {
                        required: false, message: 'Please input your role!',
                        }],
                    })(
                        <div>
                          <Tree
                              checkable
                              onCheck={this.onCheck}
                        >
                              <TreeNode title="user" key="USER"  />
                              <TreeNode title="admin" key="ADMIN" />
                              <TreeNode title="customer_service" key="CS" />
                        </Tree>
                        </div>
                     )} 
                </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                        id&nbsp;
                        </span>
                    )}
                    >
                    {getFieldDecorator('id', {
                        rules: [{ required: false, message: 'Please input your username!'}],
                        initialValue: text.id
                    })(  
                      <Input disabled="true"/>
                    )}
                  </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="E-mail"
                  >
                  {getFieldDecorator('email', {
                      rules: [{
                      type: 'email', message: 'The input is not valid E-mail!',
                      }, {
                      required: false, message: 'Please input your E-mail!',
                      }],
                      initialValue: text.email
                  })(
                      <Input />
                  )}
                </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="isAdmin"
                    >
                    {getFieldDecorator('admin', {
                        rules: [ {
                        required: false, message: 'Please input your E-mail!',
                        }],
                        initialValue:  Boolean(text.admin)
                    })(
                        <Switch defaultChecked={ Boolean(text.admin)}/>,
                    )}
                  </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                    >
                    {getFieldDecorator('phone', {
                        rules: [{ required: false, message: 'Please input your phone number!' }],
                        initialValue: text.phone
                    })(
                        <Input style={{ width: '100%' }} />
                    )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Finish</Button>
                    </FormItem>
                  </Form>
                </p>
            </Modal> 
            </div>
        );
    }
}
EditModal = Form.create()(EditModal);

export default EditModal;