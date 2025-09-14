import sharp from "sharp";
import path from "path";
import fs from "fs";

const fullDir = path.resolve(__dirname, "../../assets/full");
const thumbsDir = path.resolve(__dirname, "../../assets/thumbs");
if (!fs.existsSync(thumbsDir)) {
  fs.mkdirSync(thumbsDir, { recursive: true });
}

export const resizeImage = async (
  filename: string,
  width: number,
  height: number,
): Promise<string> => {
  const inputPath = path.join(fullDir, `${filename}.jpg`);
  const outputPath = path.join(thumbsDir, `${filename}_${width}x${height}.jpg`);

  if (!fs.existsSync(inputPath)) {
    throw new Error("Image not found at: " + inputPath);
  }

  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);

  return outputPath;
};
