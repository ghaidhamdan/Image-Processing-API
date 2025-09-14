import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("GET /api/images", () => {
  it("returns 200 for valid request", async () => {
    const response = await request.get(
      "/api/images?filename=encenadaport&width=200&height=200",
    );
    expect(response.status).toBe(200);
  });

  it("returns 400 for missing params", async () => {
    const response = await request.get("/api/images");
    expect(response.status).toBe(400);
  });
});
