import update from 'immutability-helper'

import Notification from 'components/Notification'

const initState = {
  info: null,
  loginModalVisible: false,
  isAuth: false,
  identity: null
}

export default (state = {}, action) => {
  switch (action.type) {
    case 'AUTH_GET_INFO':
      return update(state, { info: { $set: action.payload } })
    case 'AUTH_CONTROL_LOGIN_MODAL':
      return update(state, { loginModalVisible: { $set: action.payload } })
    case 'AUTH_LOGIN_SUCCESS':
      Notification.success('Success!')
      return update(state, {
        isAuth: { $set: true },
        loginModalVisible: { $set: false },
        identity: { $set: action.payload.username }
      })
    case 'AUTH_LOGIN_FAILED':
      return state
    default:
      return state
  }
}