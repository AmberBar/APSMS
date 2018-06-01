import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import { Table, Button, Modal, Form, Input, Cascader, Popconfirm} from 'antd'
import $ from "jquery"
import styles from "./PersonalInformation.less"
import * as moment from "moment"


const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];

const FormItem = Form.Item;

class PersonalInformation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addresses: [],
            visible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            addresses: nextProps.addresses,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
                visible: false
            })
            this.props.submit(values);
          }
        });
    }

    handleCreateAddress = (params) =>  {
        this.props.createAddress(params);
    }

    handleEditInfo = () => {
        this.setState({
            visible: true
        })
    }

    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
                visible: false
            })
            this.props.submit(values);
          }
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    confirm = (text) => {
        this.props.delete(text.id)
    }

    render() {
        let { user } = this.props
        let { addresses } = this.state

        const { getFieldDecorator } = this.props.form;
        if ($.isEmptyObject(user)) {
            return (<div>no data</div>);
        }

        const columns = [
            {
                title: 'address',
                dataIndex: 'address',
                key: 'address',
                width: '30%'
            },
            ,
            {
                title: 'consignee',
                key: 'consignee',
                dataIndex: 'consignee',
                width: "10%"
            }
            , 
            {
                title: 'phone',
                key: 'phone',
                dataIndex: 'phone',
                width: "10%"
            },
            {
                title: 'zipCode',
                key: 'zipCode',
                dataIndex: 'zipCode',
                width: "10%"
            },
            {
                title: 'action',
                key: 'action',
                width: "20%",
                render: (text, record, index) => {
                    return (
                        <div>
                            <Popconfirm title="Are you sure delete this task?" onConfirm={() => this.confirm(text)} okText="Yes" cancelText="No">
                                <Button>Delete</Button>
                            </Popconfirm>
                        </div>
                    );
                }
            },
        ]

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

        let s = []
        return (
            <div id="personal_info_container">
                <h1 className={styles.info_title}>Personal information</h1>
                <div className={styles.personal_info_container}>
                    <div className={styles.info_name}>
                        <p>
                            username:
                        </p>
                        <p>
                            phone:
                        </p>
                        <p>
                            email:
                        </p>
                        <p>
                            regDate:
                        </p>
                    </div>
                    <div className={styles.info_val}>
                        <p>
                            {user.username}
                        </p>
                        <p>
                            {user.phone}
                        </p>
                        <p>
                            {user.email}
                        </p>
                        <p>
                            {moment(user.regDate).format("YYYY-MM-DD")}
                        </p>
                    </div>
                    <Button type="primary" onClick={this.handleEditInfo}>Edit Personal Info</Button>

                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        destroyOnClose
                        >
                        <Form onSubmit={this.handleSubmit}>
                             <FormItem
                                >
                                {getFieldDecorator('id', {
                                    rules: [{ required: false, message: 'Please input your username!'}],
                                    initialValue: user.id
                                })(  
                                    <div></div>
                                )}
                            </FormItem>
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
                                    initialValue: user.username
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
                                    initialValue: user.password
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
                                required: false, message: 'Please input your E-mail!',
                                }],
                                initialValue: user.email
                            })(
                                <Input />
                            )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="Phone Number"
                                >
                                {getFieldDecorator('phone', {
                                    rules: [{ required: false, message: 'Please input your phone number!' }],
                                    initialValue: user.phone
                                })(
                                    <Input style={{ width: '100%' }} />
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">submit</Button>
                            </FormItem>
                        </Form>
                    </Modal>

                </div>
                <div className={styles.table}>
                    <h1 className={styles.info_title}>Personal addresses</h1>
                    <Table 
                        dataSource={addresses}
                        columns={columns}
                        pagination={false}
                    />
                </div>
                    <CreateAddress submit={this.handleCreateAddress}/>
            </div>      
        );
    }
}
PersonalInformation = Form.create()(PersonalInformation);
export default PersonalInformation;

export class CreateAddress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }
    }

    handleCreateAddress = () => {
        this.setState({
            visible: true
        })
    }

    onChange(value) {
        console.log(value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
          if (!err) {
            let address = ""
            for (let i = 0; i< values.address.length; i ++) {
                address += values.address[i] + ","
            }
            values.address = address
            this.setState({
                visible: false
            })
            this.props.submit(values);
          }
        });
    }

    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
          if (!err) {
            let address = ""
            for (let i = 0; i< values.address.length; i ++) {
                address += values.address[i] + ","
            }
            values.address = address
            this.setState({
                visible: false
            })
            this.props.submit(values);
          }
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

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

        

        return (
            <div >
                <Button onClick={this.handleCreateAddress}>
                    Create address
                </Button>
                <Modal
                    title="Create Adddress"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                    consignee&nbsp;
                                    </span>
                                )}
                                >
                                {getFieldDecorator('consignee', {
                                    rules: [{ required: true, message: 'Please input consignee!', whitespace: true }],

                                })(  
                                    <Input />
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                    Phone&nbsp;
                                    </span>
                                )}
                                >
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, message: 'Please input phone!', whitespace: true }],

                                })(  
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                            
                                {...formItemLayout}
                                label={(
                                    <span>
                                    address&nbsp;
                                    </span>
                                )}
                            >
                                {getFieldDecorator('address', {
                                    rules: [{ required: true, message: 'Please input phone!'}],

                                })(  
                                    <Cascader options={options} onChange={this.onChange} placeholder="Please select" />
                                )}
                            </FormItem>
                            
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                    zipCode&nbsp;
                                    </span>
                                )}
                                >
                                {getFieldDecorator('zipCode', {
                                    rules: [{ required: true, message: 'Please input phone!'}],

                                })(  
                                    <Input />
                                )}
                            </FormItem>

                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">submit</Button>
                            </FormItem>
                        </Form>
                </Modal>
            </div>
        );
    }
}
CreateAddress = Form.create()(CreateAddress)

