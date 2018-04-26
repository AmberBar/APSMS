
import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderLayout extends Component {

    state = {
    collapsed: false,
  };
  
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
      return (
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="/login">
                    <Link to="/login"><Icon type="bars" />Login</Link>
                </Menu.Item>
                <Menu.Item key="home">
                    <Icon type="home" />home
                </Menu.Item>
                <Menu.Item key="shopping_cart">
                    <Icon type="shopping_cart" />shoppingCart
                </Menu.Item>
     
                <Menu.Item key="customer_service">
                    <Icon type="customer_service" />Customer service
                </Menu.Item>
                <Menu.Item key="personal_information">
                    <Icon type="personal_information" />Personal information
                </Menu.Item>
                <SubMenu key="order" title={<span><Icon type="user" />My order</span>}>
                    <Menu.Item key="1">finished order</Menu.Item>
                    <Menu.Item key="2">unfinished order</Menu.Item>
                </SubMenu>
                <SubMenu key="admin" title={<span><Icon type="user" />I am admin</span>}>
                        <SubMenu key="goods" title={<span><Icon type="goods" />CURD Goods</span>}>
                            <Menu.Item key="all_goods">
                                <Link to="/goods">
                                    All Goods
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="create_goods">
                                <Link to="/goods/create">
                                    Create Goods
                                </Link>                            
                            </Menu.Item>
                            <Menu.Item key="edit_goods">Edit Goods</Menu.Item>
                            <Menu.Item key="delete_goods">Delete Goods</Menu.Item>
                        </SubMenu>
                    <Menu.Item key="users">
                        <Link to="/users">CURD Users</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
          </Sider>
      );
  }
}

export default SiderLayout;