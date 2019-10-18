const config = require("../config/config");
const jwt = require("jsonwebtoken");
const DATABASE = global.DATABASE;
const ENGINE = global.ENGINE;

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
    const {
      accessTokenSecret,
      refreshTokenSecret,
      accessTokenExpiredAt,
      refreshTokenExpiredAt
    } = config;

    const accessToken = jwt.sign({ id: user.id }, accessTokenSecret, {
      expiresIn: accessTokenExpiredAt
    });
    const refreshToken = jwt.sign({ id: user.id }, refreshTokenSecret, {
      expiresIn: refreshTokenExpiredAt
    });

    await DATABASE.emit("db/updateTokens", {
      user,
      accessTokenExpiredAt,
      refreshTokenExpiredAt,
      accessToken,
      refreshToken
    });

    res.reply({
      accessToken,
      accessTokenExpiredAt,
      refreshToken,
      refreshTokenExpiredAt
    });
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});

ENGINE.on("refresh-token", async res => {
  const headers = res.data;

  // // if refresh token exists
  // if (data.refreshToken && data.refreshToken in tokenList) {
  //   // 1
  //
  //   jwt.verify(data.refreshToken, config.refreshTokenSecret, (err, decoded) => {
  //     if (err) {
  //       tokenList[data.refreshToken] && delete tokenList[data.refreshToken]; // 1
  //       return res.status(401).json({ error: true, message: err.message });
  //     } else if (req.ip !== decoded.ip) {
  //       //2
  //       tokenList[data.refreshToken] && delete tokenList[data.refreshToken];
  //       return res
  //         .status(401)
  //         .json({ error: true, message: "Your IP adress was changed" });
  //     } else {
  //       // 2
  //       const user = {
  //         name: "Test user",
  //         ip: req.ip // 2
  //       };
  //       const token = jwt.sign(user, config.secret, {
  //         expiresIn: config.tokenLife
  //       });
  //       const response = {
  //         access_token: token,
  //         access_token_expired_at: Date.now() + config.tokenLife * 1000
  //       };
  //
  //       // update the token in the list
  //       tokenList[data.refreshToken].token = token;
  //
  //       res.status(200).json(response);
  //     }
  //   }); //2
  // } else {
  //   res.status(404).send({ error: true, message: "Invalid request" });
  // }
});
