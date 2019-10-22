const DATABASE = global.DATABASE;
const News = require("../models/news");

DATABASE.on("db/news", async res => {
  try {
    res.reply(News.getNewsWithMainFields());
  } catch (error) {
    console.error(error);
    res.replyErr({ message: "Something error" });
  }
});

DATABASE.on("db/news/create", async res => {
  try {
    const { id, title, text } = res.data;

    const newNews = new News({
      user: id,
      title,
      text
    });

    await newNews.save();
    res.reply(News.getNewsWithMainFields());
  } catch (error) {
    console.log(error.message);
    res.replyErr({ message: "Something error" });
  }
});

DATABASE.on("db/news/update", async res => {
  try {
    const { id, title, text } = res.data;

    const oneNews = await News.findOne({ _id: id });
    if (!oneNews) {
      return res.replyErr({ message: "News not found" });
    }

    oneNews.title = title;
    oneNews.text = text;

    await oneNews.save();

    res.reply(News.getNewsWithMainFields());
  } catch (error) {
    console.error(error);
  }
});

DATABASE.on("db/news/delete", async res => {
  try {
    await News.findOneAndRemove({ _id: res.data });

    res.reply(News.getNewsWithMainFields());
  } catch (error) {
    console.error(error);
    res.replyErr({ message: "Something error" });
  }
});
