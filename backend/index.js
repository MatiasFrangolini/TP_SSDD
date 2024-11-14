import express, { Router } from "express";	
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from "cors";
import AnimalRoutes from "./routes/AnimalRoutes.js";
import CheckPointRoutes from "./routes/CheckPointRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import StaticRoutes from "./routes/StaticRoutes.js";
import EventsRoutes from "./routes/EventsRoutes.js";
import { connectMQTTController } from "./controllers/mqttController.js";
dotenv.config();
const port = process.env.HTTP_PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", AnimalRoutes);
app.use("/api", CheckPointRoutes);
app.use("/api", AuthRoutes);
app.use("/api", EventsRoutes);
app.options("*", (req, res) => {
  res.status(204).end();
});
app.use(StaticRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
  connectMQTTController();
});

export const router = Router();
