const config = require("../config/config");
const jwt = require("jsonwebtoken");
const DATABASE = global.DATABASE;
const ENGINE = global.ENGINE;

const generateTokens = (
  user,
  {
    accessTokenSecret,
    refreshTokenSecret,
    accessTokenExpiredAt,
    refreshTokenExpiredAt
  },
  options = {}
) => {
  let { updateAccessToken = true, updateRefreshToken = true } = options;

  let accessToken = user.accessToken;
  let accessTokenExpiredAtDateNow = user.accessTokenExpiredAt;

  if (updateAccessToken) {
    accessTokenExpiredAtDateNow = Date.now() + accessTokenExpiredAt;
    accessToken = jwt.sign({ id: user.id }, accessTokenSecret, {
      expiresIn: accessTokenExpiredAtDateNow
    });
  }

  let refreshToken = user.refreshToken;
  let refreshTokenExpiredAtDateNow = user.refreshTokenExpiredAt;

  if (updateRefreshToken) {
    refreshTokenExpiredAtDateNow = Date.now() + refreshTokenExpiredAt;
    refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret, {
      expiresIn: refreshTokenExpiredAtDateNow
    });
  }

  return {
    accessTokenExpiredAt: accessTokenExpiredAtDateNow,
    refreshTokenExpiredAt: refreshTokenExpiredAtDateNow,
    accessToken,
    refreshToken
  };
};

ENGINE.on("registration", async res => {
  try {
    const User = await DATABASE.emit("db/registration", res.data);

    res.reply(User);
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});

ENGINE.on("login", async res => {
  try {
    const user = await DATABASE.emit("db/user", res.data);
    const tokens = generateTokens(user, config);

    await DATABASE.emit("db/updateTokens", {
      user,
      ...tokens
    });

    res.reply({
      ...tokens
    });
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});

ENGINE.on("refresh-token", res => {
  if (res.data.hasOwnProperty("authorization") && res.data.authorization) {
    // const refreshToken = res.data.authorization.slice(7);
    const refreshToken = res.data.authorization;

    jwt.verify(
      refreshToken,
      config.refreshTokenSecret,
      async (err, decoded) => {
        if (err) {
          return res.reply({ status: 401, message: err.message });
        }

        try {
          const user = await DATABASE.emit("db/userById", decoded.id);

          if (!user || refreshToken !== user.refreshToken) {
            return res.replyErr({
              status: 401,
              message: "Ошибка авторизации"
            });
          }

          let tokens = generateTokens(user, config);
          if (user.refreshTokenExpiredAt <= Date.now()) {
            await DATABASE.emit("db/updateTokens", {
              user,
              ...tokens
            });

            return res.reply({
              ...tokens
            });
          }

          tokens = generateTokens(user, config, { updateRefreshToken: false });
          return res.reply({
            ...tokens
          });
        } catch (err) {
          res.replyErr({ message: err.message });
        }
      }
    );
  } else {
    res.replyErr({ message: "Ошибка авторизации" });
  }
});
