const Router = require("koa-router");
const router = new Router();
const ENGINE = global.ENGINE;

router.get("/error", ctx => {
  const error = ctx.flash("error")[0];
  ctx.status = error.status;
  ctx.body = { message: error.message };
});

router.use("/api", require("./auth"));

module.exports = router;
