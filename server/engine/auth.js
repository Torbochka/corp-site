const DATABASE = global.DATABASE;
const ENGINE = global.ENGINE;

ENGINE.on("index", async res => {
  // try {
  //   const { products } = await DATABASE.emit("db/products");
  //   const { skills } = await DATABASE.emit("db/skills");
  //   const { social } = await DATABASE.emit("db/social");
  //   res.reply({ products, skills, social });
  // } catch (err) {
  //   res.replyErr({ message: err.message });
  // }
});
