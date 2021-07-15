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

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { name, price, image, brand, category, countInStock, description } = req.body;

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.description = description || product.description;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const crateProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;

  if (product) {
    const isUserReviewed = product.reviews.find(
      review => review.user._id.toString() === req.user._id.toString()
    );
    if (isUserReviewed) {
      res.status(404);
      throw new Error("Product already reviewed by you!");
    } else {
      const review = {
        name: req.user.name,
        rating: +rating,
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, currVal) => acc + currVal.rating, 0) / product.numReviews;

      await product.save();

      res.status(201).json("Review added");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
