import path from "path";
import { fileURLToPath } from "url";
import { join, resolve } from "path";
import { static as expressStatic } from "express";
import express from "express";

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.use(
  "/static",
  expressStatic(join(__dirname, "..", "..", "frontend", "static"))
);
app.get("/*", (req, res) => {
  res.sendFile(
    resolve(__dirname, "..", "..", "TP_SSDD", "frontend", "index.html")
  );
});

export default app;
