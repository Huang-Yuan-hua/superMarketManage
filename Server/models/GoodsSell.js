const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoodsSellSchema = new Schema({
    value: String,
    labels: [{ type: String, ref: 'meters' }],//关联表meters
});




module.exports = GoodsSell = mongoose.model("goodssells", GoodsSellSchema);