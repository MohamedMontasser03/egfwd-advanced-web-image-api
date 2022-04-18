import { ReadStream } from "fs";
import path from "path";
import sharp from "sharp";
import { doesImageExist } from "../../utils/fsUtils";
import { getResizedImageStream } from "../../utils/imageUtils";

describe("ImageUtils", async () => {
  describe("getResizedImageStream", () => {
    const imageName = "fjord.jpg";
    const width = 400;
    const height = 400;

    it("should create new file if it doesn't exist", async () => {
      const resizedImgPath = path.resolve(
        `./assets/thumb/${imageName.split(".")[0]}_${width}x${height}.${
          imageName.split(".")[1]
        }`
      );

      const resizedImage = await getResizedImageStream(
        imageName,
        width,
        height
      );

      expect(await doesImageExist(resizedImgPath)).toBe(true);
      expect(resizedImage).toBeTruthy();
    });

    it("should return existing file", async () => {
      const resizedImgPath = path.resolve(
        `./assets/thumb/${imageName.split(".")[0]}_${width}x${height}.${
          imageName.split(".")[1]
        }`
      );
      const resizedImage = await getResizedImageStream(
        imageName,
        width,
        height
      );

      expect(resizedImage).toBeInstanceOf(ReadStream);
      expect(resizedImage.path).toEqual(resizedImgPath);
    });

    it("should return correct resized image", async () => {
      const resizedImage = await getResizedImageStream(
        imageName,
        width,
        height
      );
      const resizedImageBuffer = await resizedImage.pipe(sharp()).metadata();

      expect(resizedImageBuffer.width).toEqual(width);
      expect(resizedImageBuffer.height).toEqual(height);
    });
  });
});
