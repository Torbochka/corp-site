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
    chat: {
      C: { type: Boolean, default: false },
      R: { type: Boolean, default: false },
      U: { type: Boolean, default: false },
      D: { type: Boolean, default: false }
    },
    news: {
      C: { type: Boolean, default: false },
      R: { type: Boolean, default: false },
      U: { type: Boolean, default: false },
      D: { type: Boolean, default: false }
    },
    settings: {
      C: { type: Boolean, default: false },
      R: { type: Boolean, default: false },
      U: { type: Boolean, default: false },
      D: { type: Boolean, default: false }
    }
  },
  accessToken: { type: String, default: "" },
  accessTokenExpiredAt: {
    type: Number,
    default: ""
  },
  refreshToken: { type: String, default: "" },
  refreshTokenExpiredAt: {
    type: Number,
    default: ""
  }
});

userSchema.methods.setPassword = function(password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
  return bCrypt.compareSync(password, this.password);
};

userSchema.statics.getMainFields = function(user) {
  return {
    id: user.id,
    image: user.image,
    firstName: user.firstName,
    middleName: user.middleName,
    username: user.username,
    surName: user.surName,
    permission: user.permission,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    accessTokenExpiredAt: user.accessTokenExpiredAt,
    refreshTokenExpiredAt: user.refreshTokenExpiredAt
  };
};

userSchema.statics.getUsersWithMainFields = async function() {
  const users = await this.find({});

  return users.map(user => this.getMainFields(user));
};

const user = mongoose.model("user", userSchema);
module.exports = user;
