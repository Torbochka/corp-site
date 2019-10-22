const DATABASE = global.DATABASE;
const ENGINE = global.ENGINE;

ENGINE.on("users", async res => {
  try {
    const users = await DATABASE.emit("db/users", res.data);
    res.reply(users);
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});

ENGINE.on("users/delete", async res => {
  try {
    const user = await DATABASE.emit("db/users/delete", res.data);
    res.reply(user);
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});
