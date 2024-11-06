import bcrypt from 'bcrypt';
import { userService } from '../services/UserService.js';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export class AuthController {
    userService = userService

    /*login = async (req, res) => {
        try {
            const { id, password } = req.body;
            if (!id || !password) {
                return res.writeHead(400).json({ message: "Falta el usuario o la contraseña" });
            }
            const users = await this.userService.getAllUsers();
            const user = users.find(user => user.id === id);
            if (!user) {
                return res.writeHead(404).json({ message: "Usuario no encontrado" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.writeHead(401).json({ message: "Contraseña incorrecta" });
            }
            const payload = {
                id: user.id,
                name: user.name,
                roles: user.roles
            }
            const accessToken = jwt.sign(payload, secret, { expiresIn: '1h' });
            const refreshToken = jwt.sign(payload, secret, { expiresIn: '1d' });
            res.send({ accessToken, refreshToken, ...payload });
        } catch (err) {
            res.writeHead(500).json({ message: err.message });
            res.end();
        }
    }*/

    login = async (req, res) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const parsedBody = JSON.parse(body);
                const newUser = userService.createUser(parsedBody);
                if (!newUser.id || !newUser.password) {
                    res.writeHead(400, "Invalid request");
                    res.end(JSON.stringify({ message: "Falta el usuario o la contraseña" }));
                }
                const users = await this.userService.getAllUsers();
                const user = users.find(user => user.id === newUser.id);
                if (!user) {
                    res.writeHead(404, "User not found");
                    res.end(JSON.stringify({ message: "Usuario no encontrado" }));
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    res.writeHead(401, "Invalid password");
                    res.end(JSON.stringify({ message: "La contraseña no es válida" }));
                }
                const payload = {
                    id: user.id,
                    name: user.name,
                    roles: user.roles
                }
                const accessToken = jwt.sign(payload, secret, { expiresIn: '1h' });
                const refreshToken = jwt.sign(payload, secret, { expiresIn: '1d' });
                res.send({ accessToken, refreshToken, ...payload });
            } catch (err) {
                res.writeHead(500, "Internal server error");
                res.end(JSON.stringify({ message: err.message }));
            }
        });
    }

    refresh = async (req, res) => {
        try {
            const refreshToken = req?.body?.refreshToken;
            if (!refreshToken) {
                return res.writeHead(401).send('Acceso denegado. No provee refresh token.');
            }
            const decoded = jwt.verify(refreshToken, secret);
            const accessToken = jwt.sign({ ...decoded }, secret, { expiresIn: '1h' });
            res
            .send({ accessToken, refreshToken });
        } catch (error) {
            return res.writeHead(400).send('Refresh token invalido.');
            res.end();
        }
    }
}