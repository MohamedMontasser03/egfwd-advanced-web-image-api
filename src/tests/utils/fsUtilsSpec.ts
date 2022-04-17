import path from "path";
import { doesImageExist, getImagePath } from "../../utils/fsUtils";

describe("fsUtils", () => {
  const imageName = "fjord.jpg";
  const fakeName = "NotARealImage.jpg";

  it("should return the correct image path", () => {
    const filePath = getImagePath(imageName);
    expect(filePath).toBe(path.resolve("./assets/full/fjord.jpg"));
  });

  it("should check if image exists", async () => {
    const res = await doesImageExist(imageName);
    expect(res).toBe(true);
  });

  it("should be false if image doesn't exist", async () => {
    const res = await doesImageExist(fakeName);
    expect(res).toBe(false);
  });
});
