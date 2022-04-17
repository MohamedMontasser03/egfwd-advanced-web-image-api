import express, { Request, Response } from "express";
import image from "./api/image";

const router = express.Router();

// health check endpoint
router.get("/", (_req: Request, res: Response) => {
  res.send("Server is running");
});

// use routers
router.use("/image", image);

export default router;
