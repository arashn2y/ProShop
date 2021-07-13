import express from "express";

import {
  getProducts,
  getProductsById,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router
  .route("/:id")
  .get(getProductsById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);
export default router;
