const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const role = Object.freeze({
  user      : 0,
  moderator : 1,
  admin     : 9
})

const userSchema = new mongoose.Schema({
  username : { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password : { type: String, required: true },
  role     : { type: Number, default: role["user"] },
}, { timestamps: true })

/**
 *  Hash password before save to db
 */

userSchema.pre("save", function save(next) {
  const user = this
  if (!user.isModified("password")) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
        user.password = hash
        next()
    })
  })
})

/**
 * Helper method for validating user's password
 */
userSchema.methods.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    callback(err, isMatch)
  })
}

module.exports = mongoose.model("users", userSchema)
