import express from "express";
import { resizeImage } from "../utilities/imageProcessor";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filename = req.query.filename as string;
    const width = req.query.width as string;
    const height = req.query.height as string;

    if (!filename || !width || !height) {
      return res
        .status(400)
        .send("Missing required parameters: filename, width, and height.");
    }

    const widthNum = parseInt(width, 10);
    const heightNum = parseInt(height, 10);

    if (isNaN(widthNum) || isNaN(heightNum)) {
      return res.status(400).send("Width and height must be valid numbers.");
    }

    if (widthNum <= 0 || heightNum <= 0) {
      return res.status(400).send("Width and height must be greater than 0.");
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(filename)) {
      return res.status(400).send("Invalid filename format.");
    }

    const imagePath = await resizeImage(filename, widthNum, heightNum);
    return res.sendFile(imagePath);
  } catch (err: any) {
    if (err.message.includes("Image not found")) {
      return res.status(404).send("Image not found.");
    }
    return res.status(500).send("Server error: " + err.message);
  }
});

export default router;
