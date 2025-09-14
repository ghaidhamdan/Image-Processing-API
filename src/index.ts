import express from "express";
import imagesRouter from "./routes/images";

const app = express();
const port = 3000;

app.use("/api/images", imagesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
