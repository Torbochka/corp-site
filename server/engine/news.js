const DATABASE = global.DATABASE;
const ENGINE = global.ENGINE;

ENGINE.on("news", async res => {
  try {
    const news = await DATABASE.emit("db/news", res.data);
    res.reply(news);
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});

ENGINE.on("news/create", async res => {
  try {
    const {
      decoded: { id },
      request: { body }
    } = res.data;

    const news = await DATABASE.emit("db/news/create", { id, ...body });

    res.reply(news);
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});

ENGINE.on("news/update", async res => {
  try {
    const {
      params: { id },
      request: { body }
    } = res.data;

    const news = await DATABASE.emit("db/news/update", { id, ...body });

    res.reply(news);
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});

ENGINE.on("news/delete", async res => {
  try {
    const {
      params: { id }
    } = res.data;

    const news = await DATABASE.emit("db/news/delete", id);

    res.reply(news);
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});
