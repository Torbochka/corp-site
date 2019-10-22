const DATABASE = global.DATABASE;
const User = require("../models/user");

DATABASE.on("db/user", async res => {
  try {
    const { username, password } = res.data;
    const user = await User.findOne({ username: username }).exec();

    if (!user) {
      return res.replyErr({ message: "Пользователь не зарегистрирован!" });
    }

    if (!user.validPassword(password)) {
      return res.replyErr({ message: "Неверный пароль!" });
    }

    res.reply(user);
  } catch (error) {
    console.error(error);
  }
});

DATABASE.on("db/userById", async res => {
  try {
    const user = await User.findOne({ _id: res.data }).exec();
    if (!user) {
      return res.replyErr({ message: "Пользователь не зарегистрирован!" });
    }

    res.reply(user);
  } catch (error) {
    console.error(error);
  }
});

DATABASE.on("db/updateTokens", async res => {
  try {
    const {
      user,
      accessToken,
      accessTokenExpiredAt,
      refreshTokenExpiredAt,
      refreshToken
    } = res.data;

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.accessTokenExpiredAt = accessTokenExpiredAt;
    user.refreshTokenExpiredAt = refreshTokenExpiredAt;

    const upUser = await user.save();
    res.reply(User.getMainFields(upUser));
  } catch (error) {
    console.error(error);
  }
});

DATABASE.on("db/registration", async res => {
  try {
    const { username, firstName, middleName, surName, password } = res.data;

    const isExist = await User.exists({ username: username });
    if (isExist) {
      return res.replyErr({ message: "User is exist!" });
    }

    const newUser = new User({
      username,
      firstName,
      middleName,
      surName,
      password
    });

    newUser.setPassword(password);

    res.reply(await newUser.save());
  } catch (error) {
    console.log(error);
  }
});
