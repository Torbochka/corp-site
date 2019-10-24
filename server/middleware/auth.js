const config = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (ctx, next) => {
  if (
    ctx.headers.hasOwnProperty("authorization") &&
    ctx.headers.authorization
  ) {
    let accessToken = ctx.headers.authorization;

    if (accessToken.includes("Bearer")) {
      accessToken = ctx.headers.authorization.slice(7);
    }

    jwt.verify(accessToken, config.accessTokenSecret, (err, decoded) => {
      if (err) {
        ctx.flash("error", {
          message: err.message,
          status: err.status
        });
        return ctx.redirect("/error");
      }

      ctx.decoded = decoded;
    });

    return next();
  } else {
    ctx.flash("error", {
      message: "No token provided",
      status: 400
    });
    ctx.redirect("/error");
  }
};
