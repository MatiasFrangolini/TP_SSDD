import { addCheckPoint, deleteCheckPoint, getAllCheckPoints, patchCheckPoint } from "../controllers/checkPointController.js";
import { authenticate } from "../middleware/AuthMiddleware.js";
import express from "express";

const app = express();

app.post("/checkpoints", authenticate, addCheckPoint);
app.get("/checkpoints:id?", authenticate, getAllCheckPoints);
app.delete("/checkpoints/:id", authenticate, deleteCheckPoint);
app.patch("/checkpoints/:id", authenticate, patchCheckPoint);

export default app;