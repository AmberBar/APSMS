import { Form, Modal, Input, Icon, Select, Button, AutoComplete ,Upload} from 'antd';
import React, { Component } from 'react';
import styles from "./CreateNewGoods.less"
import { localStorageService } from "../../utils/common.js"
import { isArray } from 'util';
import { isString } from 'util';
import { upload_img } from "../../utils/config"

const FormItem = Form.Item;
const { TextArea } = Input;

class EditOldGoods extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      loading: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      oldFileList: [],
      goodsDetail: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.goodsDetail)
    if (nextProps.goodsDetail.imgs) {  
      const imgs = nextProps.goodsDetail.imgs.map((img) => {
          return {
            uid: img.id,
            url: img.name
          }
      })

      this.setState({
        fileList: imgs,
        oldFileList: nextProps.goodsDetail.imgs,
       
      })
    }

    this.setState({
     
      goodsDetail:  nextProps.goodsDetail
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    let fileNames = this.state.fileList.map((file, index) => {
      if (!file.name) {
        return this.state.oldFileList[index]
      }
      
      if (isString(file.uid)) {
        return {
          name: upload_img + file.name
        }
      }
      return {
        id: file.uid,
        name: upload_img + file.name
      }
    });
    
    this.props.form.validateFields((err, values) => {
      let files = {
        "imgs": fileNames,
        createDate: this.state.goodsDetail.createDate
      }
      if (!err) {
        values = {...values, ...files}
        this.props.submit(values);
        console.log('Received values of form: ', values); 
      }
    });
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

    let {goodsDetail} = this.props

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
                  { required: false}
                ],
                // initialValue: ""
              })(
                <div className="clearfix">
                  {/* <img src="http://localhost:8888/static/imgs/2.png"/> */}
                  <Upload
                    { ...params }
                  >
                    {this.state.fileList.length >= 5 ? null : uploadButton}
                  </Upload>
                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img 
                    alt="example"
                    style={{ width: '100%' }} 
                    src={this.state.previewImage} 
                    />
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
            rules: [{ required: true, message: 'Please input your nickname!'}],
            initialValue: goodsDetail.name
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
              rules: [{ required: true, message: 'Please input goods price!' }],
              initialValue: goodsDetail.price
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                stock&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('stock', {
              rules: [{ required: true, message: 'Please input goods stock!' }],
              initialValue: goodsDetail.stock
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
              initialValue: goodsDetail.brand
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
              initialValue: goodsDetail.discription
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
              initialValue: goodsDetail.type
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
          <FormItem
          >
            {getFieldDecorator('id', {
              rules: [{ required: false}],
              initialValue: goodsDetail.id
            })(
              <div></div>
            )}
        </FormItem>
        </Form>
      </div>
    );
  }
}

EditOldGoods = Form.create()(EditOldGoods);

export default EditOldGoods;