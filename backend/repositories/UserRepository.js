import { v4 as uuidv4 } from 'uuid';
import { readFileSync, writeFileSync } from "fs";

export const FILE_PATH = "./jsondb/users.json";


export const getAllUsers = () => {
    const users = JSON.parse(readFileSync(FILE_PATH, 'utf8'));
    return users.map(user => ({ id: user.id, name: user.name, roles: user.roles, password: user.password }));
}

export const createUser = (user) => {
    const users = JSON.parse(readFileSync(FILE_PATH, 'utf8'));
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
    return newUser;
}

