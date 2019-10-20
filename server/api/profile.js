const Router = require("koa-router");
const router = new Router();
const ENGINE = global.ENGINE;

router.get("/profile", async ctx => {
  try {
    ctx.body = await ENGINE.emit("profile", ctx);
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

router.patch("/profile", async ctx => {
  try {
    ctx.body = await ENGINE.emit("updateProfile", ctx);
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

module.exports = router.routes();
