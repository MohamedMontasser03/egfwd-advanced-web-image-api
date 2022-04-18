import express, { Request, Response } from "express";
import { doesImageExist, getImagePath } from "../../utils/fsUtils";
import { getResizedImageStream } from "../../utils/imageUtils";

const image = express.Router();

// health check endpoint
image.get("/", async (req: Request, res: Response) => {
  try {
    const { image: imgName } = req.query;
    const width = parseInt(req.query.width as string) || 400;
    const height = parseInt(req.query.height as string) || 400;

    // check if width and height are valid
    if (isNaN(width) || isNaN(height)) {
      res.status(400).send("Invalid width or height");
      return;
    }

    if (!imgName) {
      res.status(400).send({ err: "image query is required" });
      return;
    }
    const imgPath = getImagePath(imgName as string);

    // check if image exists
    if (!(await doesImageExist(imgPath))) {
      res.status(404).send({ err: "image not found" });
      return;
    }

    // resize image
    const resizedImage = await getResizedImageStream(
      imgName as string,
      width,
      height
    );

    // send resized image
    res.type("image/jpg");
    resizedImage.pipe(res);
  } catch (err: unknown) {
    res.status(500).send(err);
  }
});

export default image;
