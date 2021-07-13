import asyncHandler from "express-async-handler";

import Product from "../../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (product.user.toString() === req.user._id.toString()) {
      await product.remove();
      res.status(200).json({ message: "Product Removed" });
    } else {
      res.status(401);
      throw new Error("You did not add this product");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    update product by admin
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProductByAdmin = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.email = req.body.email || product.email;
    product.isAdmin = req.body.isAdmin;

    const updatedProduct = await product.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
