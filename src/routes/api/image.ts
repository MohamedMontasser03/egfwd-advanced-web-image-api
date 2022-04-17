import express, { Request, Response } from "express";
import { getImagePath } from "../../utils/fsUtils";

const image = express.Router();

// health check endpoint
image.get("/", async (req: Request, res: Response) => {
  try {
    const { image: imgName } = req.query;
    if (!imgName) {
      res.status(400).send({ err: "image query is required" });
    }
    const imgPath = getImagePath(imgName as string);

    // send image
    res.sendFile(imgPath);
  } catch (err: unknown) {
    res.status(500).send(err);
  }
});

export default image;
