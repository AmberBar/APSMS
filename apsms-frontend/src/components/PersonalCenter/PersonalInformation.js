import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import { Table, Button, Modal, Form, Input} from 'antd'
import $ from "jquery"
import styles from "./PersonalInformation.less"

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

    handleEditInfo = () => {
        this.setState({
            visible: true
        })
    }

    handleEditAddress = () => {
        
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
                            <Button type="primary" >
                                <EditAddress { ...text}/> 
                            </Button>
                            <Button type="primary">Delete</Button>
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
                            {user.regDate}
                        </p>
                    </div>
                    <Button type="primary" onClick={this.handleEditInfo}>Edit Personal Info</Button>

                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
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
                
                    <CreateAddress />
                
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
            visible: true
        }
    }

    handleCreateAddress = () => {
        this.setState({
            visible: true
        })
    }

    render() {
        return (
            <div >
                <Button onClick={this.handleCreateAddress}>
                    Create address
                </Button>
                <Modal
                    title="Create Adddress"
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    // onCancel={this.handleCancel}
                    >
                    
                </Modal>
            </div>
        );
    }
}

let alert = Modal.alert
export class EditAddress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: true
        }
    }

    
    render() {

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

        let { text } = this.props;
        console.log(text)
        return (
            <div>
                Edit
                {/* <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    // onOk={this.handleOk}
                    // onCancel={this.handleCancel}
                    >

                </Modal> */}
            </div>
        );
    }
}