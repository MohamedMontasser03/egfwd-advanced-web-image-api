import { createReadStream } from "fs";
import path from "path";
import sharp from "sharp";
import { Stream } from "stream";
import { doesImageExist, getImagePath } from "./fsUtils";

export async function getResizedImageStream(
  imageName: string,
  width: number,
  height: number
): Promise<Stream> {
  const imgPath = getImagePath(imageName);
  const resizedImgPath = path.resolve(`./assets/thumb/${imageName}`);

  // create resized image if it doesn't exist
  if (!(await doesImageExist(resizedImgPath))) {
    const image = await sharp(imgPath);
    const resizedImage = await image.resize(width, height);
    await resizedImage.toFile(resizedImgPath);
  }

  // send resized image
  return createReadStream(resizedImgPath);
}
