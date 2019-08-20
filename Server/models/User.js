const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  identity: {
    type: String,
    required: true
  },
  motto: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mogoose.model("users", UserSchema);
