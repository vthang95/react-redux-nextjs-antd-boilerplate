import data from 'data.json'
import { find } from 'lodash'

export const authGetInfo = info => {
  return {
    type: 'AUTH::GET_INFO',
    payload: info
  }
}

export const authControlLoginModal = value => {
  return {
    type: 'AUTH::CONTROL_LOGIN_MODAL',
    payload: value
  }
}

export const authLogin = info => {
  const matchUser = find(data.accounts, user => user.username === info.username && user.password === info.password)
  if (matchUser) return { type: 'AUTH::LOGIN_SUCCESS', payload: info }
  return { type: 'AUTH::LOGIN_FAILED', payload: null }
}