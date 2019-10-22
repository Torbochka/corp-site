const DATABASE = global.DATABASE;
const User = require("../models/user");

DATABASE.on("db/profile/update", async res => {
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
    user.image = avatar;

    await user.save();
    res.reply(User.getMainFields(user));
  } catch (error) {
    console.error(error);
  }
});
