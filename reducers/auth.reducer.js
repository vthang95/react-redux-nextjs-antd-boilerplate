import update from 'immutability-helper'

const initState = {
  info: null
}

export default (state = {}, action) => {
  switch (action.type) {
    case 'AUTH_GET_INFO':
      console.log('in');
      return update(state, { info: { $set: action.payload } })
    default:
      return state
  }
}