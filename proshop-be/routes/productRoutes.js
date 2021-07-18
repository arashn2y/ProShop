import express from "express";

import {
  getProducts,
  getProductsById,
  deleteProduct,
  createProduct,
  updateProduct,
  crateProductReview,
  getTopRatedProducts,
} from "../controllers/productController/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.route("/top").get(getTopRatedProducts);
router
  .route("/:id")
  .get(getProductsById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);
router.route("/:id/reviews").post(protect, crateProductReview);
export default router;
