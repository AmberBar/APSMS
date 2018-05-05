import React, { Component } from 'react';
import styles from './GoodsDetail.less'
import { isArray } from 'util';
import { InputNumber, Button } from 'antd'

class GoodsDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        goodsDetail: this.props.goodsDetail,
        number: 1
      }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        goodsDetail: nextProps.goodsDetail, 
      })
    }

    onChange = (value) => {
      this.setState({
        number: value
      })
      console.log('changed', value);
    }

    handleAddCart = () => {
      let number = this.state.number
      if (number >= 1) {
        if (this.props.addCard) {
          this.props.addCard(number)
        }
      }
    }

    handleBuyNow = () => {
      let number = this.state.number
      if (number >= 1) {
        if (this.props.addCard) {
          this.props.buyNow(number)
        }
      }
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
                {goodsDetail.imgs.map((img, index) => {
                  return <img src={img.name} key={index}/>
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
                <Button type="primary" size="large" className={styles.confirm_button1} onClick={this.handleBuyNow}>
                  Buy now
                </Button>
                <Button　type="primary" size="large" className={styles.confirm_button2} onClick={this.handleAddCart}>
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
