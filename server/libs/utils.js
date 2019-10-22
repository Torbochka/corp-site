const fs = require("fs");
const util = require("util");
const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);

module.exports.existDirORcreate = async dest => {
  try {
    return await stat(dest);
  } catch (e) {
    if (e.code === "ENOENT") {
      return await mkdir(dest);
    } else {
      throw e;
    }
  }
};
