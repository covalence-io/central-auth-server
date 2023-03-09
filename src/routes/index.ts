import express from "express";
import apiRouter from "./api";
import authRouter from "./auth";

const router = express.Router();

router.use("/api", (req, res) => res.status(404).json({ message: "No API routes are enabled yet" }));
router.use("/auth", authRouter);

export default router;
