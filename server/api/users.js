const Router = require("koa-router");
const router = new Router();
const ENGINE = global.ENGINE;

router.get("/users", async ctx => {
  try {
    ctx.body = await ENGINE.emit("users");
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

router.delete("/users/:id", async ctx => {
  try {
    ctx.body = await ENGINE.emit("users/delete", ctx.params.id);
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

router.patch("/users/:id/permission", async ctx => {
  try {
    ctx.body = await ENGINE.emit("users/permission", ctx);
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

module.exports = router.routes();
