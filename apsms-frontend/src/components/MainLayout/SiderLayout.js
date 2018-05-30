
import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { localStorageService } from "../../utils/common.js"

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


  handleLogout() {
    localStorageService.removeItem("user")
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
                <Link to="/login"><Icon type="login" />Login</Link>
            </Menu.Item>
            <Menu.Item key="home">
                <Link to="/apsms">
                    <Icon type="home" />
                    Home
                </Link>  
            </Menu.Item>
            <Menu.Item key="shopping_cart">
                <Link to="/shoppingCart">
                    <Icon type="shopping-cart" />
                    shoppingCart
                </Link>
            </Menu.Item>
            <Menu.Item key="personal_information">
                <Link to="/personal/information">
                    <Icon type="profile" />
                    Personal information
                </Link>
            </Menu.Item>
            <Menu.Item key="my_order">
                <Link to="/orders">
                    <Icon type="user" />
                    All Order
                </Link>
            </Menu.Item>
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
                </SubMenu>
                <Menu.Item key="users">
                    <Link to="/users">CURD Users</Link>
                </Menu.Item>
                <Menu.Item key="allOrders">
                    <Link to="/allOrders">All Orders</Link>
                </Menu.Item>
            </SubMenu>
            <Menu.Item key="logout">
                <Link  to="/login" onClick={() => this.handleLogout()}>
                    <Icon type="logout" />
                    logout
                </Link>
            </Menu.Item>
        </Menu>
        </Sider>
    );
  }
}

export default SiderLayout;