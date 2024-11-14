import { sseDevices, sseCheckpoints } from "../controllers/sseController.js";
import { authenticate } from "../middleware/AuthMiddleware.js";
import express from "express";

const app = express();

app.get("/events/availableDevices", sseDevices);
app.get("/events/positions", sseCheckpoints);

export default app;