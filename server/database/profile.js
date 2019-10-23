const DATABASE = global.DATABASE;
const User = require("../models/user");

DATABASE.on("db/profile/update", async res => {
  try {
    const {
      id,
      firstName,
      middleName,
      surName,
      oldPassword,
      newPassword,
      avatar
    } = res.data;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.replyErr({ message: "User not registered!" });
    }

    if (!user.validPassword(oldPassword)) {
      return res.replyErr({ message: "Old password unvalid!" });
    }

    if (newPassword === "") {
      return res.replyErr({ message: "New password is empty!" });
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
