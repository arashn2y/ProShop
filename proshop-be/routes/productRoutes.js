import express from "express";

import {
  getProducts,
  getProductsById,
  deleteProduct,
} from "../controllers/productController/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductsById).delete(protect, isAdmin, deleteProduct);
export default router;
