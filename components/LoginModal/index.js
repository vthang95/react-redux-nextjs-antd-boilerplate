import { Component } from 'react'
import { Modal, Input, Form, Button, Checkbox, Icon } from 'antd'
import { connect } from 'react-redux'

import { authControlLoginModal, authLogin } from 'actions'

class LoginModal extends Component {
  render() {
    return (
      <Modal
        title="Login"
        width={350}
        wrapClassName="vertical-center-modal"
        visible={this.props.loginModalVisible}
        onOk={() => this.props.authControlLoginModal(false)}
        onCancel={() => this.props.authControlLoginModal(false)}
      >
        <WrappedNormalLoginForm />
      </Modal>
    )
  }
}

const NormalLoginForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        props.authLogin(values)
      }

    });
  }

  const { getFieldDecorator } = props.form

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>Remember me</Checkbox>
        )}
        <a className="login-form-forgot" href="">Forgot password</a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        You can use account <a>admin:admin</a> to login!
      </Form.Item>
    </Form>
  )
}

const WrappedNormalLoginForm = Form.create()(connect(null, { authLogin })(NormalLoginForm))

const mapStateToProps = state => {
  return {
    loginModalVisible: state.auth.loginModalVisible
  }
}

export default connect(mapStateToProps, { authControlLoginModal })(LoginModal)