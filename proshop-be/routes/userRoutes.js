import express from "express";

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserByAdmin,
} from "../controllers/userController/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, isAdmin, getUsers);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserByAdmin);
router.post("/login", authUser);

export default router;
