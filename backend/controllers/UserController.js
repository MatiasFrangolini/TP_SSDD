import bcrypt from 'bcrypt';
import { isNewUserValid } from '../validations/userValidations.js';
import userService from '../services/UserService.js';

export class UserController {
    userService = userService;

    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    createUser = async (req, res) => {
        try {
            const newUser = req.body;
            if (!isNewUserValid(newUser)) {
                return res.status(400).json({ message: "Usuario invalido" });
            }
            const passwordHash = await bcrypt.hash(newUser.password, 10);
            const user = await this.userService.createUser({
                ...newUser,
                password: passwordHash
            });
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}