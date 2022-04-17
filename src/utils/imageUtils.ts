import sharp from "sharp";

export async function resizeImage(
  imagePath: string,
  width: number = 400,
  height: number = 400
) {
  const image = sharp(imagePath);
  const resize = image.resize(width, height);
  return resize;
}
