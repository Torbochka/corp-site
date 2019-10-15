const Router = require("koa-router");
const router = new Router();
const ENGINE = global.ENGINE;

router.get("/api/registration", async ctx => {
  // try {
  //   const data = await ENGINE.emit("index");
  //   const msgsemail = ctx.flash("msgsemail")[0];
  //
  //   ctx.render("pages/index", {
  //     ...data,
  //     msgsemail
  //   });
  // } catch (error) {
  //   ctx.flash("error", {
  //     message: error.message,
  //     status: error.status || 400
  //   });
  //   ctx.redirect("/error");
  // }
});

module.exports = router.routes();
