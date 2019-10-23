const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

let uri =
  process.env.DB === "production" ? process.env.uriDB : process.env.uriDBTest;

mongoose.connect(
  uri,
  {
    useNewUrlParser: true
  },
  err => {
    if (err) {
      return console.error(err.message);
    }
  }
);

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connection open ${uri}`);
});

mongoose.connection.on("error", err => {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection disconnected app termination");
    process.exit(0);
  });
});
