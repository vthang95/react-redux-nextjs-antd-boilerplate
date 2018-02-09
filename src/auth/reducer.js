import update from "immutability-helper"

import Notification from "components/Notification"

const initState = {
  info: null,
  loginModalVisible: false,
  isAuth: false,
  identity: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case "AUTH::GET_INFO":
      return update(state, { info: { $set: action.payload } })
    case "AUTH::CONTROL_LOGIN_MODAL":
      return update(state, { loginModalVisible: { $set: action.payload } })
    case "AUTH::LOGIN_SUCCESS":
      Notification.success("Success!")
      return update(state, {
        isAuth: { $set: true },
        loginModalVisible: { $set: false },
        identity: { $set: action.payload.username }
      })
    case "AUTH::LOGIN_FAILED":
      return state
    default:
      return state
  }
}