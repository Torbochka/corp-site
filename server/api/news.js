const Router = require("koa-router");
const router = new Router();
const ENGINE = global.ENGINE;

router.get("/news", async ctx => {
  try {
    ctx.body = await ENGINE.emit("news");
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

router.post("/news", async ctx => {
  try {
    ctx.body = await ENGINE.emit("news/create", ctx);
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

router.patch("/news/:id", async ctx => {
  try {
    ctx.body = await ENGINE.emit("news/update", ctx);
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

router.delete("/news/:id", async ctx => {
  try {
    ctx.body = await ENGINE.emit("news/delete", ctx);
  } catch (error) {
    ctx.flash("error", {
      message: error.message,
      status: error.status || 400
    });
    ctx.redirect("/error");
  }
});

module.exports = router.routes();
