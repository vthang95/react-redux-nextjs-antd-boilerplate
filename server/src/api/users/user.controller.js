const async = require("async")
const { omit } = require("lodash")

const auth = require("../../authentication")
const User = require("./user.dao")

exports.getMe = (req, res) => {
  return res.json({ success: true, msg: "Ok!" })
}

exports.postLogin = (req, res) => {
  req.checkBody("email", "Email is not empty!").notEmpty()
  req.checkBody("password", "Password is not empty!").notEmpty()

  const errors = req.validationErrors(req)

  if (errors) return res.status(422).json({ success: false, msg: "Bad Argument", errors })

  const { email, password } = req.body

  async.waterfall(
    [
      callback => User.asyncFindUser({ email, password }, callback),
      User.asyncVerifyAccount
    ],
    (err, result) => {
      if (err) return res.json({ success: false, errors: err })
      if (!result.isMatch) return res.json({ success: false, msg: "Can not Login", errors: { errMsg: "Email and Password do not match!" } })
      let token = auth.signToken(result.doc)
      let user = {
        username: result.doc.username,
        email: result.doc.email,
        role: result.doc.role,
        updatedAt: result.doc.updatedAt,
        createdAt: result.doc.createdAt
      }

      res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
      return res.json({ success: true, msg: "Login successfully!", token, user })
    }
  )
}

exports.postLogout = (req, res) => {
  res.clearCookie("token")
  res.json({ success: true, msg: "Ok!" })
}

exports.postSignup = (req, res) => {
  req.checkBody("email", "Email is not empty!").notEmpty()
  req.checkBody("username", "Username is not empty!").notEmpty()
  req.checkBody("password", "Password is not empty!").notEmpty()
  req.checkBody("email", "Email is not valid!").isEmail()
  req.checkBody("username", "Username must have at least 4 characters and maximum 16 characters!").len(4, 16)
  req.checkBody("password", "Password must have at least 4 characters").len(4)

  const errors = req.validationErrors(req)

  if (errors) return res.status(422).json({ success: false, msg: "Bad Argument", errors })

  let userToSave = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }

  async.waterfall(
    [
      callback => User.asyncFindUser(userToSave, callback),
      User.asyncCreateUser
    ],
    (err, result) => {
      if (err) return res.json({ success: false, errors: err })
      return res.json({ success: true, user: { username: result.username, email: result.email } })
    }
  )
}