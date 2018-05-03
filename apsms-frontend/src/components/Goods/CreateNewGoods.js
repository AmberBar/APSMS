import { Form, Modal, Input, Icon, Select, Button, AutoComplete ,Upload} from 'antd';
import React, { Component } from 'react';
import styles from "./CreateNewGoods.less"
import { localStorageService } from "../../utils/common.js"

const FormItem = Form.Item;
const { TextArea } = Input;
// const AutoCompleteOption = AutoComplete.Option;

class CreateNewGoods extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      loading: false,
      previewVisible: false,
      previewImage: '',
      fileList: [

      ],
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    let fileNames = this.state.fileList.map((file) => {
      return {
        "name": "http://localhost:8888/static/imgs/" + file.name
      }
    });
    console.log(fileNames)
    this.props.form.validateFields((err, values) => {
      let files = {
        "imgs": fileNames
      }
      if (!err) {
        values = {...values, ...files}
        this.props.submit(values);
        console.log('Received values of form: ', values); 
      }
    });
  }
  

   handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })


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

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const token = localStorageService.getItem("user") != {}? localStorageService.getItem("user") : " ";

    let headers = {
      'Authorization': 'Bearer ' + token,
    }

    let params = {
      action: "http://127.0.0.1:8888/api/goods/upload/img/",
      listType: "picture-card",
      headers: headers,
      fileList: this.state.fileList,
      onPreview: this.handlePreview,
      onChange: this.handleChange,
    }

    return (
      <div className={styles.create_goods_container}>
        
        <Form onSubmit={this.handleSubmit}>
          <FormItem
              {...formItemLayout}
              label={(
                <span>
                  img&nbsp;
                </span>
              )}
            >
              {getFieldDecorator('imgs', {
                rules: [
                  { required: true, message: 'Please upload your img!'}
                ],
              })(
                <div className="clearfix">
                  <Upload
                    { ...params }
                  >
                    {this.state.fileList.length >= 5 ? null : uploadButton}
                  </Upload>
                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
              </div>
              )}
            </FormItem>
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
             <Input />
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