const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "UserName required"],
    unique: true
  },
  firstName: String,
  surName: String,
  middleName: String,
  image: String,
  password: {
    type: String,
    required: [true, "Password required"]
  },
  permission: {
    chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
    news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
    settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean }
  },
  accessToken: { type: String, default: "" },
  accessTokenExpiredAt: {
    type: Date,
    default: Date.now() + 24 * 60 * 60 * 1000
  },
  refreshToken: String,
  refreshTokenExpiredAt: {
    type: Date,
    default: Date.now() + 60 * 24 * 60 * 60 * 1000
  }
});

userSchema.methods.setPassword = function(password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.password);
};

const user = mongoose.model("user", userSchema);
module.exports = user;
