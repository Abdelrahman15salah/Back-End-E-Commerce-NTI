import { Router } from "express";
import { getUserProfile } from "./user.controller.js";
import authMiddleware from "../../Middlewares/auth.middleware.js";

const router = Router();

// router.get("/", test);
router.get("/", authMiddleware, getUserProfile);

export default router;
