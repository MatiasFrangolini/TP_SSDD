import express, { Router } from "express";
import staticRoutes from "./StaticRoutes.js";

const app = express();
app.use(staticRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001...");
});

export const router = Router();
