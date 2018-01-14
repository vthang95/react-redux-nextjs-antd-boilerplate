const express = require("express")
const Router = express.Router()

const userController = require("./user.controller")

Router.post('/logout', userController.postLogout)
Router.post('/login', userController.postLogin)
Router.post('/signup', userController.postSignup)

module.exports = Router