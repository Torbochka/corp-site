const DATABASE = global.DATABASE;
const ENGINE = global.ENGINE;

ENGINE.on("registration", async res => {
  try {
    const User = await DATABASE.emit("db/registration", res.data);

    res.reply(User);
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});
