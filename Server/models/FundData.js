const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const FundSchema = new Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Fund = mogoose.model("funds", FundSchema);
