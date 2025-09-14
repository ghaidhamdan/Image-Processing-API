import { resizeImage } from "../utilities/imageProcessor";
import fs from "fs";
import path from "path";

describe("resizeImage function", () => {
  const outputPath = path.resolve(
    __dirname,
    "../../assets/thumbs/encenadaport_200x200.jpg",
  );

  beforeEach(() => {
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  });

  it("creates a resized image", async () => {
    const imagePath = await resizeImage("encenadaport", 200, 200);
    expect(fs.existsSync(imagePath)).toBeTrue();
  });

  it("throws for non-existent image", async () => {
    await expectAsync(resizeImage("no-image", 100, 100)).toBeRejected();
  });

  it("throws for invalid width/height", async () => {
    await expectAsync(resizeImage("encenadaport", -50, 100)).toBeRejected();
    await expectAsync(resizeImage("encenadaport", 100, 0)).toBeRejected();
  });
});
