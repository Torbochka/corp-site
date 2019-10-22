const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  created_at: {
    type: Date,
    default: Date.now()
  },
  text: String,
  title: {
    type: String,
    required: [true, "title required"]
  },

  user: { type: Schema.Types.ObjectId, ref: "user" }
});

newsSchema.statics.getNewsWithMainFields = async function() {
  const news = await this.find({}).populate("user");

  return news.map(news => ({
    id: news.id,
    title: news.title,
    created_at: news.created_at,
    text: news.text,
    user: {
      id: news.user.id,
      username: news.user.username,
      firstName: news.user.firstName,
      middleName: news.user.middleName,
      image: news.user.image
    }
  }));
};

const news = mongoose.model("news", newsSchema);

module.exports = news;
