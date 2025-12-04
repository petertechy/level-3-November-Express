const mongoose = require("mongoose");
//Product Schema
const ProductSchema = mongoose.Schema({
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_quantity: { type: Number, require: true },
  product_date: { type: String, default: Date.now() },
});

//Product Model
const ProductModel = mongoose.model(
  "product_collection",
  ProductSchema,
  "product_collection"
);

module.exports = ProductModel