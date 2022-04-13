import express from "express";
import image from "./api/image";

const router = express.Router();

// health check endpoint
router.get("/", (req, res) => {
  res.send("Server is running");
});

// use routers
router.use("/image", image);

export default router;
