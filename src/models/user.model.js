const mongoose = require("mongoose");
const { USERROLE } = require("../config/enums");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: USERROLE.ENUM, default: "user" },
  creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
