import { Form, Modal, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Upload, message} from 'antd';
import React, { Component } from 'react';
import styles from "./CreateNewGoods.less"

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;

class CreateNewGoods extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      loading: false,
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http:127.0.0.1:8888/api/goods/upload/img',
      }],
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submit(values);
        // console.log('Received values of form: ', values);
        
      }
    });
  }
  

   handleChange = (value) => {
    console.log(`selected ${value}`);
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

    return (
      <div className={styles.create_goods_container}>
        
        <Form onSubmit={this.handleSubmit}>
          <FormItem
          {...formItemLayout}
          label={(
            <span>
              goods name&nbsp;
            </span>
          )}
        >
          {getFieldDecorator('name', {
            rules: [{ required: false, message: 'Please input your nickname!'}],
          })(
            <Input />
          )}
        </FormItem>

          {/* <FormItem
            {...formItemLayout}
            label={(
              <span>
                img&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('img', {
              rules: [{ required: true, message: 'Please upload your img!'}],
            })(
              <Input />
            //   <Upload {...props}>
            //   <Button>
            //     <Icon type="upload" /> upload
            //   </Button>
            // </Upload>
  
            )}
          </FormItem> */}
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                price&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('price', {
              rules: [{ required: false, message: 'Please input goods price!' }],
            })(
              <Input />
            )}
          </FormItem>

           <FormItem
            {...formItemLayout}
            label={(
              <span>
                brand&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('brand', {
              rules: [{ required: false, message: 'Please input goods brand!' }],
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Mercedes">Mercedes</Option>
              <Option value="BMW">BMW</Option>
              <Option value="mitsubishi">mitsubishi</Option>
            </Select>
            )}
          </FormItem>
         
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                discription&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('discription', {
              rules: [{ required: false, message: 'Please input your discription!'}],
            })(
              <TextArea rows={4} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                type&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('type', {
              rules: [{ required: false, message: 'Please input your nickname!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

CreateNewGoods = Form.create()(CreateNewGoods);

export default CreateNewGoods;