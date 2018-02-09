const UserModel = require('./user.schema')

const asyncFindUser = (userInfo, callback) => {
  UserModel
    .findOne({ $or: [{ username: userInfo.username }, { email: userInfo.email }] })
    .exec((err, doc) => {
      if (err) return callback(err)
      if (!doc) return callback(null, { exist: false, doc: null, userInfo })
      return callback(null, { exist: true, doc, userInfo })
    })
}

const asyncCreateUser = (userCheck, callback) => {
  if (userCheck.exist) return callback({ errMsg: 'User is already exists' })

  const newUser = new UserModel(userCheck.userInfo)

  newUser.save(err => {
    if (err) return callback(err)
    return callback(null, newUser)
  })
}

const asyncVerifyAccount = (userCheck, callback) => {
  if (!userCheck.exist) return callback({ errMsg: 'User is not exists' })
  userCheck.doc.comparePassword(userCheck.userInfo.password, userCheck.doc.password, (err, isMatch) => {
    if (err) return callback(err)
    return callback(null, { isMatch, doc: userCheck.doc })
  })
}

module.exports = {
  asyncFindUser,
  asyncCreateUser,
  asyncVerifyAccount
}