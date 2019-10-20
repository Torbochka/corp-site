const Router = require("koa-router");
const router = new Router();
const ENGINE = global.ENGINE;

router.delete("/users/:id", async ctx => {
  try {
    ctx.body = await ENGINE.emit("deleteUser", ctx);
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

module.exports = router.routes();
