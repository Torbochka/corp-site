const Router = require("koa-router");
const router = new Router();
const ENGINE = global.ENGINE;

router.use("/api", require("./auth"));

module.exports = router;
