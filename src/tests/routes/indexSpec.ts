import supertest from "supertest";
import app from "../..";

const request = supertest(app);

describe("GET /api", () => {
  it("should return 200 OK", async () => {
    const res = await request.get("/api");
    expect(res.status).toBe(200);
  });

  it("should return 'Server is running'", async () => {
    const res = await request.get("/api");
    expect(res.text).toBe("Server is running");
  });
});
