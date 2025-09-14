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

  it("returns 400 if all params are missing", async () => {
    const response = await request.get("/api/images");
    expect(response.status).toBe(400);
    expect(response.text).toContain("Missing required parameters");
  });

  it("returns 400 if filename is missing", async () => {
    const response = await request.get("/api/images?width=200&height=200");
    expect(response.status).toBe(400);
    expect(response.text).toContain("Missing required parameters");
  });

  it("returns 400 if width is missing", async () => {
    const response = await request.get(
      "/api/images?filename=encenadaport&height=200",
    );
    expect(response.status).toBe(400);
    expect(response.text).toContain("Missing required parameters");
  });

  it("returns 400 if height is missing", async () => {
    const response = await request.get(
      "/api/images?filename=encenadaport&width=200",
    );
    expect(response.status).toBe(400);
    expect(response.text).toContain("Missing required parameters");
  });

  it("returns 400 if width is not a number", async () => {
    const response = await request.get(
      "/api/images?filename=encenadaport&width=abc&height=200",
    );
    expect(response.status).toBe(400);
    expect(response.text).toContain("Width and height must be valid numbers");
  });

  it("returns 400 if height is not a number", async () => {
    const response = await request.get(
      "/api/images?filename=encenadaport&width=200&height=xyz",
    );
    expect(response.status).toBe(400);
    expect(response.text).toContain("Width and height must be valid numbers");
  });

  it("returns 400 if width <= 0", async () => {
    const response = await request.get(
      "/api/images?filename=encenadaport&width=-10&height=200",
    );
    expect(response.status).toBe(400);
    expect(response.text).toContain("Width and height must be greater than 0");
  });

  it("returns 400 if height <= 0", async () => {
    const response = await request.get(
      "/api/images?filename=encenadaport&width=200&height=0",
    );
    expect(response.status).toBe(400);
    expect(response.text).toContain("Width and height must be greater than 0");
  });

  it("returns 400 if filename has invalid format", async () => {
    const response = await request.get(
      "/api/images?filename=fjord123!&width=200&height=200",
    );
    expect(response.status).toBe(400);
    expect(response.text).toContain("Invalid filename format");
  });

  it("returns 404 if filename does not exist", async () => {
    const response = await request.get(
      "/api/images?filename=notfound&width=200&height=200",
    );
    expect(response.status).toBe(404);
    expect(response.text).toContain("Image not found");
  });
});
