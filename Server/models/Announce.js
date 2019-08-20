const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const AnnounceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tooltip: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  thumbs: {
    type: Number
  },
  thumbsupUsers: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Announce = mogoose.model("announce", AnnounceSchema);
