const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { USERROLE } = require("../config/enums");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, enum: USERROLE.ENUM, default: "user" },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  let user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

module.exports = mongoose.model("User", userSchema);
