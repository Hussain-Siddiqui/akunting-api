const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../../controller/product");
const route = express.Router();
route.post("/", createProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);
route.get("/", getProduct);

module.exports = route;
