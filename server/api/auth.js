const Router = require("koa-router");
const router = new Router();
const ENGINE = global.ENGINE;

router.post("/registration", async ctx => {
  try {
    const user = await ENGINE.emit("registration", ctx.request.body);
    ctx.body = { ...user };
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
