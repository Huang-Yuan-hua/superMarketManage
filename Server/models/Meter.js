const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeterSchema = new Schema({
    label: String
});



module.exports = Meter = mongoose.model("meters", MeterSchema);