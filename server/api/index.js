const Router = require("koa-router");
const router = new Router();
const auth = require("../middleware/auth");

router.get("/error", async ctx => {
  const error = ctx.flash("error")[0];
  ctx.status = error.status || 400;
  ctx.body = { message: error.message };
});

router.use("/api", require("./auth"));
router.use("/api", auth.isAuthenticated, require("./profile"));
router.use("/api", auth.isAuthenticated, require("./users"));
router.use("/api", auth.isAuthenticated, require("./news"));

module.exports = router;
