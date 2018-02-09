const express = require("express")
const Router = express.Router()

const userController = require("./user.controller")
const auth = require("../../authentication")

Router.get("/me", auth.isAuthApi, userController.getMe)
Router.post('/logout', userController.postLogout)
Router.post('/login', userController.postLogin)
Router.post('/signup', userController.postSignup)

module.exports = Router