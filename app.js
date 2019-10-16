const Koa = require("koa");
const app = new Koa();
const koaStatic = require("koa-static");
const session = require("koa-session");
const mongoose = require("mongoose");
const MongooseStore = require("koa-session-mongoose");
const body = require("koa-body");
const flash = require("koa-connect-flash");
const cors = require("@koa/cors");

require("./server/models");
require("./server/database");
require("./server/engine");

const errorHandler = require("./server/libs/error");
const config = require("./server/config/config");
const router = require("./server/api");
const port = process.env.PORT || 5000;

app.use(koaStatic("./dist"));
app.use(errorHandler);

app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
  })
);

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

app.use(
  session(
    {
      store: new MongooseStore({ connection: mongoose }),
      session: { ...config.session }
    },
    app
  )
);
app.use(flash());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
