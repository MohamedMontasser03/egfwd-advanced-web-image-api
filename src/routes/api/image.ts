import express, { Request, Response } from "express";
import sharp from "sharp";
import { doesImageExist, getImagePath } from "../../utils/fsUtils";

const image = express.Router();

// health check endpoint
image.get("/", async (req: Request, res: Response) => {
  try {
    const { image: imgName } = req.query;
    const width = 400;
    const height = 400;

    if (!imgName) {
      res.status(400).send({ err: "image query is required" });
      return;
    }
    const imgPath = getImagePath(imgName as string);

    // check if image exists
    if (!(await doesImageExist(imgName as string))) {
      res.status(404).send({ err: "image not found" });
      return;
    }

    // resize image
    const image = await sharp(imgPath);
    const resizedImage = await image.resize(width, height);

    // send resized image
    res.type("image/jpg");
    resizedImage.pipe(res);
  } catch (err: unknown) {
    res.status(500).send(err);
  }
});

export default image;
