import { notification } from "antd"

export default {
  success: (message, description) => {
    notification.success({
      message,
      description
    })
  },

  error: (message, description) =>  {
    notification.error({
      message,
      description
    })
  },

  warning: (message, description) => {
    notification.warning({
      message,
      description
    })
  },

  info: (message, description) => {
    notification.info({
      // className: 'ant-notification-warning',
      message,
      description
    })
  }
}
