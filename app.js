const Koa = require("koa");
const IO = require("koa-socket-2");

const app = new Koa();
const io = new IO();
io.attach(app);

require("./server/chat")(io);

const koaStatic = require("koa-static");
const session = require("koa-session");
const mongoose = require("mongoose");
const MongooseStore = require("koa-session-mongoose");
const body = require("koa-body");
const flash = require("koa-connect-flash");
const cors = require("@koa/cors");
const utils = require("./server/libs/utils");

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
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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
  ctx.status = err.status || 500;
  ctx.body = { message: err.message };
});

app.use(
  session(
    {
      store: new MongooseStore({ connection: mongoose }),
      ...config.session
    },
    app
  )
);
app.use(flash());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  utils.existDirORcreate(config.upload);
  console.log(`Server running on port:${port}`);
});
