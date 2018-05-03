import React, { Component } from 'react';
import styles from './GoodsDetail.less'
import { isArray } from 'util';
import { InputNumber, Button } from 'antd'

class GoodsDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        goodsDetail: this.props.goodsDetail
      }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        goodsDetail: nextProps.goodsDetail
      })

      console.log(nextProps.goodsDetail)
      console.log(nextProps.goodsDetail.imgs)
      console.log(isArray(nextProps.goodsDetail.imgs[0]))
      console.log(nextProps.goodsDetail.imgs[0].name)
    }

    onChange = (value) => {
      console.log('changed', value);
    }

    render() {
      
      let { goodsDetail } = this.state
      if (!isArray(goodsDetail.imgs)) {
        return (
          <div></div>
        )
      }
      
      return (
        <div id="goods_detail_contailer">
          <div className={styles.goods_container}> 
            <div className={styles.goods_picture}>
              <div className={styles.goods_picture_img}>
                <img src={goodsDetail.imgs[0].name} />
              </div>
              <div className={styles.goods_picture_img_list}>
                {goodsDetail.imgs.map((img) => {
                  return <img src={img.name} />
                })}
              </div>
            </div>
            <div className={styles.goods_detail_contailer}>
              <h1 className={styles.title}>
                { goodsDetail.name}
              </h1>
              <div className={styles.number}>
                Number: <InputNumber min={1} max={10} defaultValue={1} onChange={this.onChange} />
              </div>
              <div className={styles.confirm}>
                <Button type="primary" size="large" className={styles.confirm_button1}>
                  Buy now
                </Button>
                <Button　type="primary" size="large" className={styles.confirm_button2}>
                  Add to cart
                </Button>
              </div>
            </div>
            <div className={styles.discription}>
              {goodsDetail.discription}  
            </div>
          </div>
	      </div>
      );
    }
}

export default GoodsDetail;
