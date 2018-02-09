import { combineReducers } from "redux"

import authReducer from "src/auth/reducer"

export default combineReducers({
  auth: authReducer
})