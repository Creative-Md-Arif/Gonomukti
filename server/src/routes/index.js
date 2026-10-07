import { Router } from "express";
import authRoutes from "./authRoutes.js";
import publicRoutes from "./publicRoutes.js";
import adminRoutes from "./adminRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import configRoutes from "./configRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use(uploadRoutes); 
router.use("/admin", adminRoutes);
router.use("/config", configRoutes);
router.use("/", publicRoutes);

export default router;
