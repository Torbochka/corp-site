const fs = require("fs");
const util = require("util");
const rename = util.promisify(fs.rename);
const path = require("path");
const config = require("../config/config");

const DATABASE = global.DATABASE;
const ENGINE = global.ENGINE;

ENGINE.on("profile", async res => {
  try {
    const user = await DATABASE.emit("db/userById", res.data.decoded.id);

    res.reply(user);
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});

ENGINE.on("profile/update", async res => {
  try {
    const {
      decoded: { id },
      request: { files, body }
    } = res.data;

    body.avatar = "";

    if (files.avatar) {
      const fullPath = path.join(
        config.uploadFront,
        `${Date.now()}-${files.avatar.name}`
      );
      await rename(files.avatar.path, `dist/${fullPath}`);

      body.avatar = fullPath;
    }

    const user = await DATABASE.emit("db/profile/update", {
      id,
      ...body
    });

    res.reply(user);
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});
