const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: null,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
    default: null,
  },
  productType: {
    type: String,
    required: true,
    default: null,
  },
});
const Product=mongoose.model("Product",productSchema)
module.exports=Product