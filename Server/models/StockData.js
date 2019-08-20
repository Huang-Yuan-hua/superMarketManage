const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const StockSchema = new Schema({
    type: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    place: {
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

module.exports = Stock = mogoose.model("stockDatas", StockSchema);
