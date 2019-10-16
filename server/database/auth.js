const DATABASE = global.DATABASE;
const mongoose = require("mongoose");
// const User = mongoose.model("user");
const User = require("../models/user");

DATABASE.on("db/registration", async res => {
  const { username, firstName, middleName, surName, password } = res.data;

  const newUser = new User({
    username,
    firstName,
    middleName,
    surName,
    password
  });

  newUser.setPassword(password);

  // TODO try..catch ?
  const user = await newUser.save();

  res.reply(user);

  //   .then(user => {
  //     req.logIn(user, err => {
  //       if (err) next(err);
  //       req.flash("message", "User create");
  //       return res.redirect("/profile");
  //     });
  //   })
  //   .catch(next);
  //
  // res.reply({ products });
});
