const Product = require("../../Models/product/index");
const createProduct = async (req, res) => {
  const productObject = req.body;
  try {
    const saveProduct = await Product.create(productObject);
    console.log("saveProduct", saveProduct);

    // await saveProduct.save();
    res.status(200).json({
      message: "product created successfully",
      data: saveProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const updatedata = req.body;
  // console.log("object updatedata id ", req.params.id);
  try {
    const updateObject = await Product.findByIdAndUpdate(
      req.params.id,
      updatedata,
      {
        new: true,
      }
    );
    // console.log("object product id ", updateObject);
    if (!updateObject) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "product update successfully",
      product: updateObject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("object product id ", id);

  const deleteObject = await Product.findByIdAndDelete({ id });
  console.log("object product id ", deleteObject);

  if (!deleteObject) {
    res.status(400).json({
      message: "user not found",
    });
  }
  res.status(200).json({
    success: false,
    message: "product update successfully",
  });
};

const getProduct = async (req, res) => {
  try {
    const limit = req.query.limit;
    const page = req.query.page;
    const dataObject = await Product.find().limit(1).skip(1).sort({ price: 1 });
    console.log("object");
    res.status(200).json({
      message: "get All Products succefully",
      produst: dataObject,
    });
  } catch (error) {
    console.log("object error", error);
    res.status(500).json({
      message: "object not find something went wrong",
    });
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getProduct };
