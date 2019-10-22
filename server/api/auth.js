const Router = require("koa-router");
const router = new Router();
const ENGINE = global.ENGINE;

router.post("/registration", async ctx => {
  try {
    ctx.body = await ENGINE.emit("registration", ctx.request.body);
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

router.post("/login", async ctx => {
  try {
    const data = await ENGINE.emit("login", ctx.request.body);
    ctx.body = { ...data };
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

router.post("/refresh-token", async ctx => {
  try {
    const data = await ENGINE.emit("refresh-token", ctx.headers);
    ctx.body = { ...data };
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

module.exports = router.routes();
