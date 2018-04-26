import { Component } from "react";
import styles from "./CreateModal.less"
import {Modal, Form, Input, Tree, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const TreeNode = Tree.TreeNode;

let checkArray = []
class CreateModal extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
          confirmDirty: false,
          autoCompleteResult: [],
          editVisible: true,
          checked: []
        }
      }
  
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let params = []
            for (let i = 0 ; i < checkArray.length; i ++) {
                console.log(i)
                let role = {
                    "name": checkArray[i]
                }
                params.push(role)
            }
            values.roles = params
            this.props.submit(values);
            console.log('Received values of form: ', values);
          }
        });
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


    setModal2Visible() {
        // this.setState({
        //     editVisible: !this.state.editVisible
        // });
        this.props.changeCreateModal(!this.state.editVisible)
    }  

    componentWillReceiveProps(next) {
        console.log(next.showCreateModal)
        this.setState({
            editVisible: next.showCreateModal
        });
    }

      onCheck = (checkedKeys, info) => {
            checkArray = checkedKeys
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

        
    
        return(
            <div>
                <Button type="primary" onClick={() => this.setModal2Visible()}>Create</Button>
                <Modal
                    title="Create or Edit User"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.editVisible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                >
                <p>
                <Form onSubmit={this.handleSubmit}>
                <FormItem
                {...formItemLayout}
                label={(
                    <span>
                    Username&nbsp;
                    <Tooltip title="What do you want others to call you?">
                        <Icon type="question-circle-o" />
                    </Tooltip>
                    </span>
                )}
                >
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                })(
                    <Input />
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
                    required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <Input />
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
                        required: true, message: 'Please input your role!',
                        }],
                    })(
                        
                        <Tree
                            checkable
                            onSelect={this.onSelect}
                            onCheck={this.onCheck}
                      >
                            <TreeNode title="user" key="USER"  />
                            <TreeNode title="admin" key="ADMIN" />
                            <TreeNode title="customer_service" key="CS  " />
                      </Tree>
                     )} 
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="Password"
                >
                {getFieldDecorator('password', {
                    rules: [{
                    required: true, message: 'Please input your password!',
                    }, {
                    validator: this.validateToNextPassword,
                    }],
                })(
                    <Input type="password" />
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                    >
                    {getFieldDecorator('confirm', {
                        rules: [{
                        required: true, message: 'Please confirm your password!',
                        }, {
                        validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="Phone Number"
                    >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
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
CreateModal = Form.create()(CreateModal);

export default CreateModal;