import React, { Component } from 'react';
import styles from './OrderConfirm.less'
import { isArray, isNullOrUndefined } from 'util';
import { Button , Table, InputNumber, List, Card, Radio, message} from 'antd'
import { Link } from 'react-router-dom'
import $ from 'jquery';


class OrderConfirm extends Component {

    constructor(props) {
      super(props);
      this.state = {
        shoppingList: {},
        dataSource: [],
        addresses: [],
        address: {},
        total: 0
      }
    }

    componentWillReceiveProps(nextProps) {
        
        let total = 0;

        nextProps.shoppingList.map((order) => {
            return total += order.sum
        });

        this.setState({
            dataSource: nextProps.shoppingList,
            addresses: nextProps.addresses,
            total: total
        })

        // if(nextProps.addresses.length >= 1) {
        //     this.setState({
        //         value: nextProps.addresses[0].id
        //     })
        // }
    }

    onChange = (value) => {
        
    }

    handleChooseAddress = (address) => {
        console.log(address)
        this.setState({
            address: address
        })
    }

    submit = () => {
        if ($.isEmptyObject(this.state.address)) {
            message.error("please choose address");
            return;
        }
        let param = {};
        param = {
            address: this.state.address,
            shoppingLists: this.state.dataSource,
            createDate: new Date(),
            status: "obligations",
            total: this.state.total
        }

        this.props.submit(param)
    }

    render() {
        let { shoppingList, dataSource, addresses, address} = this.state

         if (!shoppingList) {
            return (
                <div></div>
            )
        }

        const columns = [
            {
                title: 'name',
                dataIndex: 'id',
                key: 'goods_name',
            },
            {
                title: 'price',
                key: 'price',
                render(text) {
                    return <span>
                        {text.goods.price}
                    </span>
                }
            },
            {
                title: 'number',
                key: 'number',
                dataIndex: 'number',
            },
            {
                title: 'sum',
                dataIndex: 'sum',
                key: 'sum',
            },
        ]
       
        return (
            <div id="order_confirm_contrainer">
                <h1 className={styles.confirm_h1}>please confirm your address:</h1>
                <hr className={styles.confirm_hr}/>
                <List
                    // grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                    grid={{ gutter: 15, column: 3 }}
                    dataSource={addresses}
                    renderItem={address => (
                        <List.Item>
                            <div id="div_card" className={styles.card} onClick={() => this.handleChooseAddress(address)}>
                                <Card title={address.consignee} bordered={false} style={{ width: 300 }}>
                                    <p>{address.address} {address.phone}</p>
                                    <p>
                                        <Link to="/">
                                            modify
                                        </Link>
                                    </p>
                                </Card>
                            </div>
                        </List.Item>
                    )}
                />
                <h1  className={styles.confirm_h1}>please confirm your order:</h1>
                <hr className={styles.confirm_hr}/>
                <div>
                    <Table 
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                    />
                </div>
                <div className={styles.button}>
                    <Button type="primary" onClick={this.submit}>confirm order</Button>
                </div>
            </div>
        );
        }
}

export default OrderConfirm;
