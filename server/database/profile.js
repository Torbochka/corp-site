const DATABASE = global.DATABASE;
const User = require("../models/user");

DATABASE.on("db/profile/update", async res => {
  try {
    const user = await User.findOne({ _id: res.data.id });

    if (!user) {
      res.replyErr({ message: "User not registered!" });
    }

    const err = await user.updateProfile(res.data);

    if (err.error) {
      res.replyErr({ message: err.message });
    }

    res.reply(User.getMainFields(user));
  } catch (error) {
    console.error(error);
  }
});
