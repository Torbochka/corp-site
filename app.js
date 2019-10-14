const Koa = require("koa");
const app = new Koa();
const koaStatic = require("koa-static");
const session = require("koa-session");
const body = require("koa-body");
const flash = require("koa-connect-flash");
const utils = require("./server/libs/utils");

require("./server/database/index");
require("./server/engine/index");

const errorHandler = require("./server/libs/error");
const config = require("./server/config");
const router = require("./server/routes");
const port = process.env.PORT || 5000;

app.use(koaStatic("./dist"));
app.use(errorHandler);

app.use(
  body({
    multipart: true,
    formidable: {
      uploadDir: config.upload,
      keepExtensions: true
    }
  })
);

app.on("error", (err, ctx) => {
  ctx.response.body = {};
  ctx.render("pages/error", {
    status: ctx.response.status,
    error: ctx.response.message
  });
});

app
  .use(session(config.session, app))
  .use(flash())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  utils.existDirORcreate(config.upload);
  console.log(`Server running on http://localhost:${port}`);
});
