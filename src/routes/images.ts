import express from "express";
import { resizeImage } from "../utilities/imageProcessor";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (!filename) return res.status(400).send("Missing filename");
    if (!width || !height || width <= 0 || height <= 0)
      return res.status(400).send("Invalid width or height");

    const imagePath = await resizeImage(filename, width, height);
    res.sendFile(imagePath);
  } catch (err: any) {
    if (err.message.includes("Image not found"))
      return res.status(404).send(err.message);
    res.status(500).send(err.message);
  }
});

export default router;
