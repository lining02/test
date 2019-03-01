import React, { Component } from 'react';
import styles from './index.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';

const { Header, Content, Footer, Sider } = Layout;

@connect(({ loading, app }) => ({ loading, app }))
class BasicLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    const {
      location: { pathname },
      children,
    } = this.props;
    const menus = this.props.app.menus
    console.log(this.props)
    if (pathname === '/login') {
      return <div>{children}</div>;
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className={styles.logo} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {menus.map((menu, idx) => {
              return (
                <Menu.Item key={menu.route}>
                  <Icon type={menu.icon} />
                  <span>{menu.name}</span>
                  <Link to={menu.route}>{menu.name}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
