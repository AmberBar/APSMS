import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react';
import styles from './MainLayout.less'
import { Link } from 'react-router-dom'
import SiderLayout from "./SiderLayout"

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

function MainLayout({ children, location }) {
  return (
    <div className={styles.normal}>
      <Layout style={{ minHeight: '100vh' }}>
        <SiderLayout />
         <Layout>
           <div className={styles.mall_container}> 
            {children}
           </div>
         {/* <Footer style={{ textAlign: 'center' }}>
            apsms ©2018 Created by amber
        </Footer> */}
       </Layout>
      </Layout>
    </div>
    );
  }

export default MainLayout;
