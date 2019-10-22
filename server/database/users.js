const DATABASE = global.DATABASE;
const User = require("../models/user");

DATABASE.on("db/users", async res => {
  try {
    res.reply(await User.getUsersWithMainFields());
  } catch (error) {
    console.error(error);
    res.replyErr({ message: "Something error" });
  }
});

DATABASE.on("db/users/delete", async res => {
  try {
    const user = await User.findOneAndRemove({ _id: res.data }).exec();

    if (!user) {
      return res.replyErr({ message: "User not found" });
    }

    res.reply(user);
  } catch (error) {
    console.error(error);
  }
});

DATABASE.on("db/users/permission", async res => {
  try {
    const { id, permission } = res.data;

    const user = await User.findOne({ _id: id });

    user.permission = permission;

    await user.save();

    res.reply(User.getUsersWithMainFields());
  } catch (err) {
    res.replyErr({ message: err.message });
  }
});
