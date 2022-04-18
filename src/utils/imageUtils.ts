import { createReadStream, existsSync, mkdir, ReadStream } from "fs";
import path from "path";
import sharp from "sharp";
import { doesImageExist, getImagePath } from "./fsUtils";

export async function getResizedImageStream(
  imageName: string,
  width: number,
  height: number
): Promise<ReadStream> {
  const imgPath = getImagePath(imageName);
  const resizedImgPath = path.resolve(
    `./assets/thumb/${imageName.split(".")[0]}_${width}x${height}.${
      imageName.split(".")[1]
    }`
  );

  // create assets folder if it doesn't exist
  if (!existsSync(path.resolve("./assets/thumb"))) {
    mkdir(path.resolve("./assets/thumb"), { recursive: true }, (err) => {
      if (err) throw err;
    });
  }

  // create resized image if it doesn't exist
  if (!(await doesImageExist(resizedImgPath))) {
    const image = await sharp(imgPath);
    const resizedImage = await image.resize(width, height);
    await resizedImage.toFile(resizedImgPath);
  }

  // send resized image
  return createReadStream(resizedImgPath);
}
