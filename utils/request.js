import axios from "axios"

const sendGet = (url, params, _token) => {
  let token

  if (!_token) token = localStorage.getItem("jwt")
    else token = _token

  return new Promise((resolve, reject) => {
    if (token) return resolve(axios({
      method: "get",
      url,
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
      else return reject({ internal_error: "Access Token is missing!" })
  });
}

const sendPost = (url, params, data, _token) => {
  let token

  if (!_token) token = localStorage.getItem("jwt")
    else token = _token

  return new Promise((resolve, reject) => {
    if (token) return resolve(axios({
      method: "post",
      url,
      data: data,
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
      else return reject({ internal_error: "Access Token is missing!" })
  });
}

const sendPut = (url, params, data, _token) => {
  let token

  if (!_token) token = localStorage.getItem("jwt")
    else token = _token

  return new Promise((resolve, reject) => {
    if (token) return resolve(axios({
      method: "put",
      url,
      params,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
      else return reject({ internal_error: "Access Token is missing!" })
  });
}

const sendDelete = (url, params, _token) => {
  let token

  if (!_token) token = localStorage.getItem("jwt")
    else token = _token

  return new Promise((resolve, reject) => {
    if (token) return resolve(axios({
      method: "delete",
      url,
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }))
      else return reject({ internal_error: "Access Token is missing!" })
  });
}

export {
  sendGet,
  sendPost,
  sendPut,
  sendDelete
}
