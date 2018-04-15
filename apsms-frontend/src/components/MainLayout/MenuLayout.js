import React, { Component } from 'react';
import styles from './MenuLayout.less'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MenuLayout extends Component {

    constructor(props) {
      super(props);
      this.state = {
        current: 'home'
      }
    }

    handleClick = (e) => {
      this.setState({
        current: e.key,
      });
    }

    render() {
      return (
        <div id="navigation_container">
          <div className={styles.menu_container}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="home">
                <Icon type="home" />home
              </Menu.Item>
              <Menu.Item key="shopping_cart">
                <Icon type="shopping_cart" />shoppingCart
              </Menu.Item>
              <Menu.Item key="my_order">
                <Icon type="my_order" />My order
              </Menu.Item>
              <Menu.Item key="customer_service">
                <Icon type="customer_service" />Customer service
              </Menu.Item>
              <Menu.Item key="personal_information">
                <Icon type="personal_information" />Personal information
              </Menu.Item>
            </Menu>
          </div>
        </div>
      );
    }
}

export default MenuLayout;
