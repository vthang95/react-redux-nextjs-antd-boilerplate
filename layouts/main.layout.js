import { Component } from 'react'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'

import LoginModal from 'components/LoginModal'
import { authControlLoginModal } from 'actions'
import style from './main.scss'

class MainLayout extends Component {
  render() {
    return (
      <Layout className="layout">
        <Layout.Header>
          <span className="logo">Next starter</span>
          {
            this.props.auth.identity
              ? <div className="account">Signed in as <span>{this.props.auth.identity}</span></div>
              : <div style={{ float: 'right' }}>
                  <span className="account-login" onClick={() => this.props.authControlLoginModal(true)}>Login</span>
                  <span className="account-signup">Signup</span>
                  <LoginModal />
                </div>
          }
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { authControlLoginModal })(MainLayout)