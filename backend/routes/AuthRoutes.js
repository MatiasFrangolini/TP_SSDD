import { AuthController } from '../controllers/AuthController.js';
import express from 'express';

const app = express();

const authController = new AuthController();

app.post('/login', authController.login);
app.post('/refresh', authController.refresh);

export default app;