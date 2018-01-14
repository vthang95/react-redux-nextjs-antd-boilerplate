const jwt = require('jsonwebtoken')
const _ = require('lodash')

const User = require('./api/users/user.schema')

const getUserForm = ({ email, username, _id }) => {
  return {
    _id,
    email,
    username
  }
}

const signToken = userInfo => jwt.sign(getUserForm(userInfo), process.env.SESSION_SECRET)

const decodeToken = token => jwt.verify(token, process.env.SESSION_SECRET)

const isAuthServer = (req, res, next) => {
  if (req.cookies && req.cookies.token) {

    jwt.verify(req.cookies.token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err) return res.redirect('/admin/login')
      let userFormData = getUserForm(decoded)
      User.findOne({ _id: userFormData._id })
        .exec((err, exist) => {
          if (err) return res.redirect('/admin/login')
          if (exist) {
            let userServer = {
              _id: exist._id,
              username: exist.username,
              email: exist.email,
              token: req.cookies.token,
              role: exist.role
            }
            req.userServer = userServer
            return next()
          }
          return res.redirect('/admin/login')
        })
    })
  } else {
    return res.redirect('/admin/login')
  }
}

const isAuthApi = (req, res, next) => {
  if (req.headers && req.headers['authorization']) {
    const bearerToken = req.headers['authorization'].split(' ')
    if (bearerToken[0] !== 'Bearer') return res.json({ success: false, msg: 'Authentication Failed' })
    jwt.verify(bearerToken[1], process.env.SESSION_SECRET, (err, decoded) => {
      if (err) return res.json({ success: false, msg: 'Authentication Failed' })
      let userFormData = getUserForm(decoded)
      User.findOne({ _id: userFormData._id })
        .exec((err, exist) => {
          if (err) return res.json({ success: false, msg: 'Authentication Failed' })
          if (exist) {
            let user = {
              _id: exist._id,
              username: exist.username,
              email: exist.email,
              role: exist.role
            }
            req.user = user
            return next()
          }
          return res.json({ success: false, msg: 'Authentication Failed' })
        })
    })
  } else {
    return res.json({ success: false, msg: 'Authentication Failed' })
  }
}

const isAuthorized = roles => {
  let permission = {
    user: 0,
    moderator: 1,
    admin: 9
  }
  return (req, res, next) => {
    let condition = _.some(roles, (role) => req.user.role === permission[role])

    if (condition) return next()
    return res.json({ success: false, message: 'Không đủ quyền', error: null })
  }
}

const isAuthorizedServer = roles => {
  let permission = {
    user: 0,
    moderator: 1,
    admin: 9
  }

  return (req, res, next) => {
    let condition = _.some(roles, (role) => req.userServer.role === permission[role])
    if (condition) return next()
    return res.send('<h1>Không đủ quyền</h1>')
  }
}

module.exports = {
  signToken,
  decodeToken,
  isAuthServer,
  isAuthApi,
  isAuthorized,
  isAuthorizedServer
}
