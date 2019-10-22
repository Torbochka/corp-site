const Router = require("koa-router");
const router = new Router();
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const ENGINE = global.ENGINE;

const isAuthenticated = async (ctx, next) => {
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
      message: "No token provided.",
      status: 400
    });
    ctx.redirect("/error");
  }
};

router.get("/error", ctx => {
  const error = ctx.flash("error")[0];
  ctx.status = error.status || 400;
  ctx.body = { message: error.message };
});

router.use("/api", require("./auth"));
router.use("/api", isAuthenticated, require("./profile"));
router.use("/api", isAuthenticated, require("./users"));
router.use("/api", isAuthenticated, require("./news"));
router.use("/api", isAuthenticated, require("./permission"));

module.exports = router;
