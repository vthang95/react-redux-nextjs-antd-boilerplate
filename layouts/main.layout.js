import { Component } from 'react'
import { Layout, Menu } from 'antd'

import style from './main.scss'

class MainLayout extends Component {
  render() {
    return (
      <Layout className="layout">
        <Layout.Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: '0 50px' }}>
          {this.props.children}
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          React/Nextjs simple boilerplate ©2017 Created by vthang95
        </Layout.Footer>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </Layout>
    )
  }
}

export default MainLayout