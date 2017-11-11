import { Component } from 'react'
import { Layout, Menu } from 'antd'

import style from './main.scss'

class MainLayout extends Component {
  render() {
    return (
      <Layout className="layout">
        <Layout.Header>
          Logo
          <div style={{ float: 'right' }}>
            Avatar
          </div>
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