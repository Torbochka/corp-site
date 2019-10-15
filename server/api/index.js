const Router = require("koa-router");
const router = new Router();
const ENGINE = global.ENGINE;

router.use("/auth", require("./auth"));

module.exports = router;
