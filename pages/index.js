import React from 'react'
import { Button } from 'antd'

import Notification from 'components/Notification'
import bigdaddy from 'hocs/bigdaddy'
import style from './index.scss'
import { authGetInfo } from 'actions'
import connect from 'store'

class Index extends React.Component {
  static async getInitialProps(ctx) {
    // do something in server here!
    const { store } = ctx

    const sendString = "I Got You in Server! Dont believe? You can view page source and find me there!..."
    store.dispatch(authGetInfo(sendString))

    return {}
  }

  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero-body">
            <h1>Welcome to the boilerplate!</h1>
            <h3>{this.props.auth.info}</h3>
            <div>
              <Button
                type="danger"
                onClick={() => Notification.success('Yay!', 'You clicked!')}
              >
                Click Me!
              </Button>
            </div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { authGetInfo })(bigdaddy(Index))