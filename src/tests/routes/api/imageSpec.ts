import sharp from "sharp";
import supertest from "supertest";
import app from "../../..";

const request = supertest(app);

describe("image routes", () => {
  describe("GET /api/image", () => {
    const testImage = "fjord.jpg";
    const width = 400;
    const height = 400;

    it("should return error if no image query", async () => {
      const res = await request.get("/api/image");
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ err: "image query is required" });
    });

    it("should return error if image doesn't exist", async () => {
      const res = await request.get("/api/image?image=notfound.jpg");
      expect(res.status).toBe(404);
    });

    it("should return resized image", async () => {
      const res = await request.get(`/api/image?image=${testImage}`);
      const imgMeta = await sharp(res.body).metadata();

      expect(res.status).toBe(200);
      expect(res.type).toBe("image/jpg");
      expect(res.body).toBeInstanceOf(Buffer);
      expect(imgMeta.width).toBe(width);
      expect(imgMeta.height).toBe(height);
    });
  });
});
