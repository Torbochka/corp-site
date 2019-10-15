const mongoose = require("mongoose");
const Cats = require("./schema");
const Joi = require("joi");

// const schema = Joi.object().keys({
//   name: Joi.string()
//     .alphanum()
//     .min(3)
//     .max(30)
//     .required(),
//   age: Joi.number()
//     .integer()
//     .min(1)
//     .max(45)
//     .required(),
// });
//
// module.exports.gets = async query => {
//   const limit = parseInt(query.limit || 10);
//   const skip = parseInt(query.skip || 0);
//   const count = await Cats.find().count();
//   const cats = await Cats.find()
//     .skip(skip)
//     .limit(limit);
//   return { count, cats };
// };
//
// module.exports.getById = function(paramsId) {
//   return Cats.find({ _id: paramsId });
// };
//
// module.exports.add = function(data) {
//   const { error } = Joi.validate(data, schema);
//   if (error) {
//     return Promise.reject(new Error(error));
//   }
//   const Cat = new Cats({
//     name: data.name,
//     age: parseInt(data.age),
//   });
//
//   return Cat.save();
// };
//
// module.exports.update = function(data, paramsId) {
//   const { error } = Joi.validate(data, schema);
//   if (error) {
//     return Promise.reject(new Error(error));
//   }
//   const Cat = {
//     name: data.name,
//     age: parseInt(data.age),
//   };
//
//   return Cats.findByIdAndUpdate(
//     {
//       _id: paramsId,
//     },
//     {
//       $set: Cat,
//     },
//     { new: true }
//   );
// };
//
// module.exports.delete = function(paramsId) {
//   return Cats.findByIdAndRemove({ _id: paramsId });
// };
