const DATABASE = global.DATABASE;
const User = require("../models/user");

DATABASE.on("db/updateProfile", async res => {
  try {
    const {
      id,
      firstName,
      middleName,
      surName,
      newPassword,
      avatar
    } = res.data;

    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return res.replyErr({ message: "Пользователь не зарегистрирован!" });
    }

    user.firstName = firstName;
    user.middleName = middleName;
    user.surName = surName;
    user.setPassword(newPassword);
    user.avatar = avatar;

    await user.save();
    res.reply(user);
  } catch (error) {
    console.error(error);
  }
});
