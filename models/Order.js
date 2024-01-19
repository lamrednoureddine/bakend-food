const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const user = require('../models/User');
const product = require('../models/Product')
const OrderSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    items: [{
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    }],
    totalPrice: Number,
    //... any other fields related to an order
});
module.exports = mongoose.model("Order", OrderSchema);