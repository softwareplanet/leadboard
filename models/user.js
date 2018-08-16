const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Web service users who can login
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  email: { type: String, required: [true, "E-Mail is required"], index: { unique: true } },
  password: { type: String, required: [true, "Password is required"] },
  domain: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Domain" },
  timestamp: { type: Date, default: Date.now }
});

const SALT_ROUNDS = 9;
userSchema.pre("save", function(next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt
    .hash(user.password, SALT_ROUNDS)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => next(err));
});

userSchema.methods.passwordMatches = (candidatePassword, user) => {
  return bcrypt.compare(candidatePassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
